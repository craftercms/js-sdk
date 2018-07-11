export const searchResponse = {
    "responseHeader": {
      "status": 0,
      "QTime": 1,
      "params": {
        "q": "*",
        "fl": "localId",
        "fq": [
          "content-type:\"page/article\"",
          "-disabled:\"true\"",
          "-expired_dt:[* TO NOW]"
        ],
        "index_id": "editorial",
        "rows": "2",
        "wt": "javabin",
        "version": "2"
      }
    },
    "response": {
      "start": 0,
      "maxScore": null,
      "numFound": 9,
      "documents": [
        {
          "localId": "/site/website/articles/2017/1/men-styles-for-winter/index.xml"
        },
        {
          "localId": "/site/website/articles/2017/1/women-styles-for-winter/index.xml"
        }
      ]
    }
};