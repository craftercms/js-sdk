import { log } from '@craftercms/utils';

declare namespace window {
  const studioICERepaint: Function;
}

/**
 * In Context Editing Utitly class
 */
export class InContextEditing {

  /**
   * Adds the appropiate attributes to display the pencil for an ICE Group.
   * @param {string} id - ID of the HTML element
   * @param {string} group - Name of the ICE Group
   * @param {string} label - Label of the ICE Group
   */
  static addGroup(id, group, label) {
    let element = document.getElementById(id);
    if (element) {
      element.setAttribute('data-studio-ice', group);
      element.setAttribute('data-studio-ice-label', label || group);
    } else {
      log(`Could not add ICE group to element # ${id}`, log.ERROR);
    }
  }

  /**
   * Adds the appropiate attributes to display the pencil for a site component.
   * @param {string} id - ID of the HTML element
   * @param {string} path - Path of the site component
   * @param {string} label - Label of the site component
   */
  static addPath(id, path, label) {
    let element = document.getElementById(id);
    if (element) {
      element.setAttribute('data-studio-ice', '');
      element.setAttribute('data-studio-ice-path', path);
      element.setAttribute('data-studio-ice-label', label || path);
    } else {
      log(`Could not add ICE path to element # ${id}`, log.ERROR);
    }
  }

  /**
   * Updates the pencils according to all HTML attributes present in the page.
   * This method needs to be called after all changes to groups/components have been made.
   */
  static update() {
    if ('studioICERepaint' in window) {
      window.studioICERepaint();
    }
  }

  /**
   * Loads the scripts required for ICE group/components to work properly in the Crafter Studio Preview.
   * This method needs to be called once the page is loaded.
   * TODO: we should rather move all the guest.js logic into this lib
   */
  static addToolSupport() {
    let element = document.createElement('script');
    element.setAttribute('data-main', '/studio/overlayhook?cs.js');
    element.src = '/studio/static-assets/libs/requirejs/require.js';
    document.getElementsByTagName('body')[0].appendChild(element);
  }

}
