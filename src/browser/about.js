/*
Setup the about page (browser).
*/
import * as dom from 'common/components/dom'
import canvas from 'common/components/about/canvas'
import system from 'common/components/about/system'
import * as controls from 'common/components/controls'

// setup the about page
export default (tse) => {
  tse.classList.add('tse-help')
  dom.setContent(tse, [
    controls.program,
    dom.createTabs([
      { label: 'System', active: true, content: [system] },
      { label: 'Canvas', active: false, content: [canvas] }
    ])
  ])
}
