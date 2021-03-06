/*
Required by main/index.js; handles the system menu.
*/
import { dialog, ipcMain, Menu, systemPreferences } from 'electron'
import { readFile } from 'fs'
import { show, windows } from './windows'
import languages from 'common/constants/languages'
import extensions from 'common/constants/extensions'
import * as examples from 'common/constants/examples'

// disable dication and emoji items in edit menu on macos
if (process.platform === 'darwin') {
  systemPreferences.setUserDefault('NSDisabledDictationMenuItem', 'boolean', true)
  systemPreferences.setUserDefault('NSDisabledCharacterPaletteMenuItem', 'boolean', true)
}

// keep the current language around, for customising the openFile dialogue
let currentLanguage

// languages submenu
const languagesSubmenu = languages.map(language => ({
  type: 'radio',
  label: `Turtle ${language}`,
  click: () => windows.system.webContents.send('set-language', language)
}))

// system menu
const systemMenu = {
  label: 'Turtle System E',
  submenu: languagesSubmenu.concat([
    { type: 'separator' },
    { label: 'Language Guide', click: () => show('help') },
    { label: 'About', click: () => show('about') },
    { type: 'separator' },
    { role: 'quit' }
  ])
}

// open program function (called by the file menu below)
const openProgram = () => {
  dialog.showOpenDialog(
    {
      properties: ['openFile'],
      filters: [
        { name: `Trutle Graphics ${currentLanguage}`, extensions: [extensions[currentLanguage]] },
        { name: 'Turtle Graphics Export Format', extensions: ['tgx'] }
      ]
    },
    (files) => {
      if (files && files[0]) {
        readFile(files[0], 'utf8', (err, content) => {
          if (err) {
            dialog.showErrorBox(err.title, err.message)
          } else {
            windows.system.webContents.send('set-file', { filename: files[0], content })
          }
        })
      }
    }
  )
}

// file menu
const fileMenu = {
  label: 'File',
  submenu: [
    {
      label: 'New program',
      click: () => windows.system.webContents.send('new-program')
    },
    {
      label: 'New skeleton program',
      click: () => windows.system.webContents.send('new-skeleton-program')
    },
    {
      label: 'Open program',
      click: openProgram
    },
    { type: 'separator' },
    {
      label: 'Save program',
      click: () => windows.system.webContents.send('save-program')
    },
    {
      label: 'Save export file',
      click: () => windows.system.webContents.send('save-tgx-program')
    },
    { type: 'separator' },
    {
      label: 'Close program',
      click: () => windows.system.webContents.send('new-program')
    }
  ]
}

// edit menu
const editMenu = {
  label: 'Edit',
  submenu: [
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' }
  ]
}

// options menu
const optionsMenu = {
  label: 'Options',
  submenu: [
    {
      type: 'checkbox',
      label: 'Show canvas on run',
      click: () => windows.system.webContents.send('toggle-show-canvas')
    },
    {
      type: 'checkbox',
      label: 'Show output on write',
      click: () => windows.system.webContents.send('toggle-show-output')
    },
    {
      type: 'checkbox',
      label: 'Show memory on dump',
      click: () => windows.system.webContents.send('toggle-show-memory')
    },
    { type: 'separator' },
    {
      label: 'More machine options',
      click: () => show('settings')
    }
  ]
}

// example menu item
const exampleMenuItem = example =>
  ({
    label: examples.names[example],
    click: () => windows.system.webContents.send('set-example', example)
  })

// example group menu item
const exampleGroupMenuItem = exampleGroup =>
  ({
    label: `Examples ${exampleGroup.index} - ${exampleGroup.title}`,
    submenu: exampleGroup.examples.map(exampleMenuItem)
  })

// examples menu
const examplesMenu = {
  label: 'Examples',
  submenu: examples.menu.map(exampleGroupMenuItem)
}

// development menu
const devMenu = {
  label: 'Development',
  submenu: [
    {
      label: 'Test all example programs',
      click: () => { windows.system.webContents.send('test-all-examples') }
    },
    {
      label: 'Reset system to initial state',
      click: () => { windows.system.webContents.send('reset') }
    },
    { type: 'separator' },
    { role: 'reload' },
    { role: 'forcereload' },
    { role: 'toggledevtools' }
  ]
}

// the full menu bar
const menu = (process.env.NODE_ENV === 'production')
  ? Menu.buildFromTemplate([systemMenu, fileMenu, editMenu, optionsMenu, examplesMenu])
  : Menu.buildFromTemplate([systemMenu, fileMenu, editMenu, optionsMenu, examplesMenu, devMenu])

// set the full menu bar as the application menu
Menu.setApplicationMenu(menu)

// when the renderer is loaded, it will tell us about the local storage; listen for this and update
// the menu items accordingly
ipcMain.on('language-changed', (event, language) => {
  const index = { BASIC: 0, Pascal: 1, Python: 2 }
  menu.items[0].submenu.items[index[language]].checked = true
  currentLanguage = language
})

ipcMain.on('show-canvas-changed', (event, showCanvas) => {
  menu.items[3].submenu.items[0].checked = showCanvas
})

ipcMain.on('show-output-changed', (event, showOutput) => {
  menu.items[3].submenu.items[1].checked = showOutput
})

ipcMain.on('show-memory-changed', (event, showMemory) => {
  menu.items[3].submenu.items[2].checked = showMemory
})
