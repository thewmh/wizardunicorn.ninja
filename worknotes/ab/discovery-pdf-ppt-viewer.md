---
title: AB PPT PDF Viewer
description: These are discovery notes for AB PPT PDF Viewer.
permalink: /worknotes/ab/pdf-ppt-viewer

layout: post
# sidenav: docs
# subnav:
#   - text: Section one
#     href: '#section-one'
#   - text: Section two
#     href: '#section-two'
---

## Discovery - PPT PDF Viewer

The scope of this story is to determine if there is a good solution to showing PPT and PDF files on page. We’ve discussed functionality similar to what Confluence has today. This could be a library or 3rd party tool.

### Initial Findings

Short of making all documents into PDFs, there does not appear to be a single solution for displaying both PPT and PDF files, but separate solutions for each. The following list is by no means a suggestion or selection, but a collection of what has been discovered.

### PPT

[One Drive Embed Code](https://support.office.com/en-us/article/embed-a-presentation-in-a-web-page-or-blog-19668a1d-2299-4af3-91e1-ae57af723a60)

[ViewerJS](https://viewerjs.org/examples/) - Latest GitHub commit from [08/31/2017](https://github.com/webodf/ViewerJS/commit/5926843da6e1a5019372ff8ea9e73899c5d71e22), but built off of [WebODF](https://webodf.org/) which relies on the [OASIS](https://en.wikipedia.org/wiki/OASIS_(organization)) [Open Document Format](https://en.wikipedia.org/wiki/OpenDocument) to view files (requires exporting PPT documents in ODF format)

OR...export PPT as a PDF?

### PDF

[PDFObject](https://pdfobject.com)

Stack Overflow Post About [Displaying a PDF in a Modal](https://stackoverflow.com/questions/35286303/pdf-file-to-be-displayed-on-the-dialog-modal-via-bootstrap)...using [PDFObject](https://pdfobject.com)

[PDFJS](https://mozilla.github.io/pdf.js/) - by Mozilla... [browser support listed here](https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#faq-support)