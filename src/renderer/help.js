/*
Setup the help page (Electron).
*/
import { create } from 'common/components/tabs'
import basics from 'common/components/help/basics'
import colours from 'common/components/help/colours'
import commands from 'common/components/help/commands'
import cursors from 'common/components/help/cursors'
import fonts from 'common/components/help/fonts'
import input from 'common/components/help/input'
import operators from 'common/components/help/operators'
import structures from 'common/components/help/structures'

// setup the help page
export default (tsx) => {
  tsx.classList.add('tsx-help')
  tsx.appendChild(help)
}

const help = create('tsx-system-tabs', [
  { label: 'Commands', active: true, content: [commands] },
  { label: 'Basics', active: false, content: [basics] },
  { label: 'Structures', active: false, content: [structures] },
  { label: 'Operators', active: false, content: [operators] },
  { label: 'User Input', active: false, content: [input] },
  { label: 'Constants', active: false, content: [colours, fonts, cursors] }
])