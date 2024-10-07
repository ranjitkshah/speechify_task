/**
 * List of HTML tags that we want to ignore when finding the top level readable elements
 * These elements should not be chosen while rendering the hover player
 */
const IGNORE_LIST = [
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BUTTON",
  "LABEL",
  "SPAN",
  "IMG",
  "PRE",
  "SCRIPT",
];

/**
 *  **TBD:**
 *  Implement a function that returns all the top level readable elements on the page, keeping in mind the ignore list.
 *  Start Parsing inside the body element of the HTMLPage.
 *  A top level readable element is defined as follows:
 *      1. The text node contained in the element should not be empty
 *      2. The element should not be in the ignore list (also referred as the block list)
 *      3. The element should not be a child of another element that has only one child.
 *            For example: <div><blockquote>Some text here</blockquote></div>. div is the top level readable element and not blockquote
 *      4. A top level readable element should not contain another top level readable element.
 *            For example: Consider the following HTML document:
 *            <body>
 *              <div id="root"></div>
 *              <div id="content-1">
 *                <article>
 *                  <header>
 *                    <h1 id="title">An Interesting HTML Document</h1>
 *                    <span>
 *                      <address id="test">John Doe</address>
 *                    </span>
 *                  </header>
 *                  <section></section>
 *                </article>
 *              </div>
 *            </body>;
 *            In this case, #content-1 should not be considered as a top level readable element.
 */

function hasNonEmptyTextContent(element: Element): any {
  const textContent = element.textContent?.trim();
  return textContent && textContent.length > 0;
}

function isInIgnoreList(element: Element): any{
  return IGNORE_LIST.includes(element.tagName.toUpperCase());
}

function isSingleChildElement(element: Element): any {
  return element.parentElement?.children.length === 1;
}

function containsAnotherTopLevelElement(element: Element, readableElements: Element[]): any {
  return readableElements.some(readableElement => element !== readableElement && element.contains(readableElement));
}

export function getTopLevelReadableElementsOnPage(): any {
   
    const body = document.body;
    const allElements = Array.from(body.getElementsByTagName("*"))

    const readableElements: Element[] = [];
    for (const element of allElements) {
      if(!isInIgnoreList(element)&&hasNonEmptyTextContent(element)&&!isSingleChildElement(element)) {
           readableElements.push(element);
      }
    }

    const topLevelReadableElements = readableElements.filter(e=> {
      return !containsAnotherTopLevelElement(e, readableElements);
    })

    return topLevelReadableElements;


}
