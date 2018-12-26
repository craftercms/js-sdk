import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactElement } from 'react';
import { debounceTime, shareReplay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

import { MessageScope, MessageTopic } from '@craftercms/models';
import { InContextEditing } from '@craftercms/ice';
import { nullOrUndefined } from '@craftercms/utils'

const store = {
    window,
    portal: document.createElement('crafter-studio-container'),
    scrollX: 0,
    scrollY: 0,
    reflow$: merge(
        fromEvent(document, 'scroll'),
        fromEvent(window, 'resize'))
        .pipe(
            shareReplay(1),
            debounceTime(100)
        )
};

class ICEControls extends React.Component<any, any> {
    state: any;
    props: any;
    setState: any;

    constructor(props: any) {
        super(props);
        this.state = {
            style: {
                top: -100,
                left: -100,
                zIndex: 100,
                color: 'red',
                position: 'absolute'
            },
            buttonStyle: {
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                padding: 0,
                borderRadius: '2px',
                color: '#f7cd2c',
                cursor: 'pointer'
            }
        };
    }

    render() {
        return ReactDOM.createPortal(this.markup(), store.portal);
    }

    edit(url, iceId) {
        InContextEditing.zoneOn(url, iceId);
    }

    markup() {
        const { state, props } = this;
        const { url, iceId } = props;
        return (
            <div style={state.style}
                className={'crafter-studio__controls-overlay'}
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut}>
                <button type="button" style={state.buttonStyle}>
                    <i className="material-icons" style={{ fontDisplay: 'block' }} onClick={() => this.edit(url, iceId)}>edit</i>
                </button>
                {/* <button type="button"><i className="material-icons">delete</i></button> */}
            </div>
        );
    }

}

export class ICEZone extends React.Component<any, any> {

    node: HTMLElement;
    nodes: HTMLElement[];
    controls: ICEControls;
    state: any;
    props: any;
    setState: any;

    constructor(props) {
        super(props);
        this.state = {
            mode: 'always',
            mouseover: true,
            show: false
        };
    }

    componentWillMount() {
        const me = this;

        InContextEditing.subscribeTo(
            MessageTopic.HOST_ICE_START_REQUEST,
            function onNext(e) {
                me.setState({ show: true });
            },
            MessageScope.ALL
        );

        InContextEditing.subscribeTo(
            MessageTopic.HOST_END_ICE_REQUEST,
            function onNext(e) {
                me.setState({ show: false });
            },
            MessageScope.ALL
        );

        InContextEditing.subscribeTo(
            MessageTopic.INIT_ICE_REGIONS,
            function onNext(e) {
                me.setState({ show: true });
            },
            MessageScope.ALL
        );
    }

    componentDidMount() {
        store.reflow$.subscribe(() => {
            this.updateControlsPosition();
        });
        this.updateControlsPosition();

        InContextEditing.checkInitRegions();
    }

    componentDidUpdate() {
        this.updateControlsPosition();
    }

    updateControlsPosition() {
        const { scrollY, scrollX } = store;
        const { controls, node } = this;
        if (controls && node) {
            const pos = node.getBoundingClientRect();
            controls.setState({
                style: {
                    ...controls.state.style,
                    top: pos.top + scrollY,
                    left: pos.left + scrollX
                }
            });
        }
    }

    render() {

        let timeout = null;
        this.node = null;
        this.nodes = [];

        const mouseout = () => timeout = setTimeout(() => this.setState({ mouseover: false }), 50);
        const { state, props } = this;
        const { children, model } = props;
        const mapped = React.Children.map(
            children as ReactElement<any>,
            (child: ReactElement<any>) => React.cloneElement(child, {
                ref: (n) => {
                    // TODO: How to handle this?
                    // WARNING: "n" may not always be an HTMLElement. It may be a component.
                    if (!nullOrUndefined(n)) {
                        this.nodes.push(n);
                        if (nullOrUndefined(this.node)) {
                            this.node = n;
                        }
                    }
                    child['ref'] && child['ref'](n);
                },
                onMouseOver: (e) => {
                    clearTimeout(timeout);
                    this.updateControlsPosition();
                    this.setState({ mouseover: true });
                    child.props.onMouseEnter && child.props.onMouseEnter(e);
                },
                onMouseOut: (e) => {
                    mouseout();
                    child.props.onMouseOut && child.props.onMouseOut(e);
                }

            }));
        if ((state.mouseover || state.mode === 'always') && state.show) {
            mapped.push(
                <ICEControls
                    key={null}
                    ref={(ctrls) => (this.controls = ctrls)}
                    url={props.url}
                    iceId={props.iceId}
                    onMouseOver={() => clearTimeout(timeout)}
                    onMouseOut={mouseout} />
            );
        }
        return mapped;
    }
}

document.body.appendChild(store.portal);

store.reflow$.subscribe(() => {
    store.scrollY = store.window.scrollY;
    store.scrollX = store.window.scrollX;
});