/*
Setup the about page (Electron).
*/
import { create } from 'common/components/tabs'
import canvas from 'common/components/about/canvas'
import system from 'common/components/about/system'

// setup the about page
export default (tsx) => {
  tsx.classList.add('tsx-help')
  tsx.appendChild(about)
}

// the about tabs
const about = create('tsx-system-tabs', [
  { label: 'System', active: true, content: [system] },
  { label: 'Canvas', active: false, content: [canvas] }
])