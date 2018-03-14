const create = require('../../dom/create');
// const highlight = require'../languages/highlight');
const session = require('../../state/session');
const signals = require('../../state/signals');

const highlight = code => code;

const BASIC = [
  create('div', { content: `    <h3>User Input</h3>
    <p>The facilities for user input – via keyboard or mouse – are designed to be as straightforward and comprehensible as possible, while operating strictly through simple processes that are consistent with the workings of the <i>Turtle Machine</i>.</p>
    <h4>Mouse Position Detection</h4>
    <p>The x- and y-coordinates of the mouse&rsquo;s current position can be found at any time by using the special global variables <code class="variable">?MOUSEX</code> and <code class="variable">?MOUSEY</code> – these do not require the mouse to be clicked.</p>
    <h4>Mouse Click Detection</h4>
    <p>When a mouse click is performed, the x- and y-coordinates of the click position are remembered by the variables <code class="variable">?CLICKX</code> and <code class="variable">?CLICKY</code>. However to identify the type of click, use the variable <code class="variable">?CLICK</code>, which is initially set to a value of <span class="integer">-1</span>, but after any click has taken place is set to a numerical value of <span class="integer">128</span> plus additions as follows:</p>
    <table class="help-table">
      <tr><td class="integer">1</td><td>if the click was with the left mouse button</td></tr>
      <tr><td class="integer">2</td><td>if the click was with the right mouse button</td></tr>
      <tr><td class="integer">4</td><td>if the click was with the middle mouse button</td></tr>
      <tr><td class="integer">8</td><td>if the <kbd>shift</kbd> key was held down while clicking</td></tr>
      <tr><td class="integer">16</td><td>if the <kbd>alt</kbd> key was held down while clicking</td></tr>
      <tr><td class="integer">32</td><td>if the <kbd>ctrl</kbd> key was held down while clicking</td></tr>
      <tr><td class="integer">64</td><td>if it was a double-click</td></tr>
    </table>
    <p>So if <code><span class="variable">n%</span> <span class="operator">=</span> <span class="variable">?CLICK</span></code> makes <code class="variable">n%</code> equal to <span class="integer">137</span> (<span class="integer">128</span> <span class="operator">+</span> <span class="integer">8</span> <span class="operator">+</span> <span class="integer">1</span>), this indicates that a left-click is currently under way, with the <kbd>shift</kbd> key held down. When the click event is finished, the <code class="variable">?CLICK</code> value will become negative. Thus if <code class="variable">?CLICK</code> returns a value of <span class="integer">-137</span>, this indicates that the last click event – now finished – was shift+left; the coordinate position of that click can still be identified – until the next click takes place – as (<code class="variable">?CLICKX</code>, <code class="variable">?CLICKY</code>). On a left-click, the variable <code class="variable">?LMOUSE</code> records the relevant value (as calculated above); likewise <code class="variable">?RMOUSE</code> and <code class="variable">?MMOUSE</code> record any right-click or middle-click. Again, these are all made negative when the click is released, so an empty loop like:</p>
    <pre>  <span class="keyword">REPEAT</span>
  <span class="keyword">UNTIL</span> <span class="variable">?LMOUSE</span> <span class="operator">&gt;</span> <span class="integer">0</span>;</pre>
    <p>waits for a left-click with the mouse. Afterwards, <code class="variable">?CLICKX</code> and <code class="variable">?CLICKY</code> indicate where that click event occurred, and <code class="variable">?CLICK</code> can be queried using the bitwise <code class="operator">AND</code> operator to discover which special keys were pressed (e.g. <code><span class="keyword">IF</span> (<span class="function">ABS</span>(<span class="variable">?CLICK</span>) <span class="keyword">AND</span> <span class="integer">8</span>) <span class="operator">&gt;</span> <span class="integer">0</span></code> will test whether <kbd>shift</kbd> was being held down).</p>
    <h4>Key Press Detection</h4>
    <p>Detecting key presses (rather than typing in of characters) uses the variables <code class="variable">?KEY</code> and <code class="variable">?KSHIFT</code>, and the function <code class="function">KEYSTATUS</code>. <code class="variable">?KEY</code> gives the code of the last key to be pressed – these codes can be tested using the special keycode constants <code class="constant">\\ALT</code>, <code class="constant">\\BACKSPACE</code>, <code class="constant">\\CAPSLOCK</code>, <code class="constant">\\CTRL</code>, <code class="constant">\\DELETE</code>, <code class="constant">\\DOWN</code>, <code class="constant">\\END</code>, <code class="constant">\\ESCAPE</code>, <code class="constant">\\HOME</code>, <code class="constant">\\INSERT</code>, <code class="constant">\\LEFT</code>, <code class="constant">\\LWIN</code>, <code class="constant">\\PGDN</code>, <code class="constant">\\PGUP</code>, <code class="constant">\\RETURN</code>, <code class="constant">\\RIGHT</code>, <code class="constant">\\RWIN</code>, <code class="constant">\\SHIFT</code>, <code class="constant">\\SPACE</code>, <code class="constant">\\TAB</code>, and <code class="constant">\\UP</code>, as well as <code class="constant">\\a</code> to <code class="constant">\\z</code>, <code class="constant">\0</code> to <code class="constant">\9</code>, <code class="constant">\\#</code>, <code class="constant">\\=</code> etc. Keys on the numeric keypad have codes <code class="constant">\\#0</code>, <code class="constant">\\#1</code> etc., and function keys <code class="constant">\\f1</code>, <code class="constant">\\f2</code> etc. All these stand for numeric values (e.g. <code class="constant">\\RETURN</code> is <span class="integer">13</span>, <code class="constant">\\ESCAPE</code> is <span class="integer">27</span>), but <code><span class="keyword">IF</span> <span class="variable">?KEY</span> <span class="operator">=</span> <span class="constant">\\RETURN</span></code> is easier to understand than <code><span class="keyword">IF</span> <span class="variable">?KEY</span> <span class="operator">=</span> <span class="integer">13</span></code>.</p>
    <p>Like the mouse-click variables, <code class="variable">?KEY</code> becomes negative after the key is released, so <code><span class="keyword">REPEAT</span> : <span class="keyword">UNTIL</span> <span class="variable">?KEY</span> <span class="operator">=</span> <span class="operator">-</span><span class="constant">\\a</span></code> will wait until the &lsquo;A&rsquo; key has been released. If you want to identify the last key whether it is still pressed or not, use <code class="function">ABS</code> (e.g. <code><span class="keyword">IF</span> <span class="function">ABS</span>(<span class="variable">?KEY</span>) <span class="operator">=</span> <span class="constant">\\a</span> <span class="keyword">THEN</span> <span class="meta-comment">&hellip;</span></code>).</p>
    <p>Whenever a key is pressed, the variable <code class="variable">?KSHIFT</code> gives its &lsquo;shift-status&rsquo;, calculated in the same way as <code class="variable">?CLICK</code> (i.e. <span class="integer">128</span> plus <span class="integer">8</span> if <kbd>shift</kbd> was down, <span class="integer">16</span> for <kbd>alt</kbd>, <span class="integer">32</span> for <kbd>ctrl</kbd>, and turning negative after the key is released). So to test if <kbd>ctrl</kbd> was down on the last keypress, use <code><span class="keyword">IF</span> (<span class="function">ABS</span>(<span class="variable">?KSHIFT</span>) <span class="operator">AND</span> <span class="integer">32</span>) <span class="operator">&gt;</span> <span class="integer">0</span></code>, with <code class="operator">AND</code> here acting as a bitwise boolean operator.</p>
    <p>To recover the shift-status for the last press of the <kbd>X</kbd> key (say), use <code><span class="function">KEYSTATUS</span>(<span class="constant">\\x</span>)</code>, which can tell you (a) whether <kbd>shift</kbd> / <kbd>alt</kbd> / <kbd>ctrl</kbd> were down; (b) whether the <kbd>X</kbd> is still pressed (since <code class="function">KEYSTATUS</code> goes negative on release); (c) whether <kbd>X</kbd> has been pressed at all (since all of these input codes are set to <span class="integer">-1</span> initially, and can be reset to <span class="integer">-1</span> using <code><span class="function">RESET</span>(<span class="constant">\\x</span>)</code> etc.).</p>
    <h4>Keyboard Input</h4>
    <p>The system provides a <i>keyboard buffer</i> to store typed characters. Initially this is set to store up to 32 characters, but can be extended using e.g. <code><span class="function">KEYBUFFER</span>(<span class="integer">50</span>)</code>. To read from the buffer into a string, use e.g. <code><span class="variable">s$</span> <span class="operator">=</span> <span class="function">READ</span>(<span class="integer">10</span>)</code>, which reads up to 10 characters (depending on how many are in the buffer). <code><span class="function">KEYSTATUS</span>(<span class="constant">\\KEYBUFFER</span>)</code> returns the number of characters it contains, and <code><span class="function">RESET</span>(<span class="constant">\\KEYBUFFER</span>)</code> flushes it.</p>
    <p><code><span class="variable">s$</span> <span class="operator">=</span> <span class="function">READLN</span></code> reads a line of text, waiting until the <kbd>return</kbd> key is pressed and then making <code class="variable">s$</code> equal to what has been typed into the buffer (discarding the <kbd>return</kbd> character).</p>
    <p>The function <code class="function">DETECT</code> waits a given time for some input to be received (e.g. a specific key pressed), and returns <code class="constant">TRUE</code> when that input is received, or <code class="constant">FALSE</code> if it is not received in time. Thus <code><span class="keyword">IF</span> <span class="function">DETECT</span>(<span class="constant">\\ESCAPE</span>, <span class="integer">5000</span>) <span class="keyword">THEN</span> <span class="meta-comment">&hellip;</span> <span class="keyword">ELSE</span> <span class="meta-comment">&hellip;</span></code> gives 5 seconds to press the <kbd>escape</kbd> key (meanwhile continuing to collect any typed characters in the keyboard buffer). By default, text that goes into the keyboard buffer is also &lsquo;echoed&rsquo; to the console (below the Canvas), along with text that is output (using <code class="function">WRITE</code> or <code class="function">WRITELN</code>). This behaviour can be turned on and off with <code><span class="function">KEYECHO</span>(<span class="constant">TRUE</span>)</code> and <code><span class="function">KEYECHO</span>(<span class="constant">FALSE</span>)</code>.</p>
` }),
];

const Pascal = [
  create('div', { content: `    <h3>User Input</h3>
    <p>The facilities for user input – via keyboard or mouse – are designed to be as straightforward and comprehensible as possible, while operating strictly through simple processes that are consistent with the workings of the <i>Turtle Machine</i>.</p>
    <h4>Mouse Position Detection</h4>
    <p>The x- and y-coordinates of the mouse&rsquo;s current position can be found at any time by using the special global variables <code class="variable">?mousex</code> and <code class="variable">?mousey</code> – these do not require the mouse to be clicked.</p>
    <h4>Mouse Click Detection</h4>
    <p>When a mouse click is performed, the x- and y-coordinates of the click position are remembered by the variables <code class="variable">?clickx</code> and <code class="variable">?clicky</code>. However to identify the type of click, use the variable <code class="variable">?click</code>, which is initially set to a value of <span class="integer">-1</span>, but after any click has taken place is set to a numerical value of <span class="integer">128</span> plus additions as follows:</p>
    <table class="help-table">
      <tr><td class="integer">1</td><td>if the click was with the left mouse button</td></tr>
      <tr><td class="integer">2</td><td>if the click was with the right mouse button</td></tr>
      <tr><td class="integer">4</td><td>if the click was with the middle mouse button</td></tr>
      <tr><td class="integer">8</td><td>if the shift key was held down while clicking</td></tr>
      <tr><td class="integer">16</td><td>if the alt key was held down while clicking</td></tr>
      <tr><td class="integer">32</td><td>if the ctrl key was held down while clicking</td></tr>
      <tr><td class="integer">64</td><td>if it was a double-click</td></tr>
    </table>
    <p>So if <code><span class="variable">n</span> <span class="operator">:=</span> <span class="variable">?click</span></code> makes <code class="variable">n</code> equal to <span class="integer">137</span> (<span class="integer">128</span> <span class="operator">+</span> <span class="integer">8</span> <span class="operator">+</span> <span class="integer">1</span>), this indicates that a left-click is currently under way, with the <kbd>shift</kbd> key held down. When the click event is finished, the <code class="variable">?click</code> value will become negative. Thus if <code class="variable">?click</code> returns a value of <span class="integer">-137</span>, this indicates that the last click event – now finished – was shift+left; the coordinate position of that click can still be identified – until the next click takes place – as (<code class="variable">?clickx</code>, <code class="variable">?clicky</code>). On a left-click, the variable <code class="variable">?lmouse</code> records the relevant value (as calculated above); likewise <code class="variable">?rmouse</code> and <code class="variable">?mmouse</code> record any right-click or middle-click. Again, these are all made negative when the click is released, so an empty loop like:</p>
    <pre>  <span class="keyword">repeat</span>
  <span class="keyword">until</span> <span class="variable">?lmouse</span> <span class="operator">&gt;</span> <span class="integer">0</span>;</pre>
    <p>waits for a left-click with the mouse. Afterwards, <code class="variable">?clickx</code> and <code class="variable">?clicky</code> indicate where that click event occurred, and <code class="variable">?click</code> can be queried using the bitwise <code class="operator">and</code> operator to discover which special keys were pressed (e.g. <code><span class="keyword">if</span> (<span class="function">abs</span>(<span class="variable">?click</span>) <span class="operator">and</span> <span class="integer">8</span>) <span class="operator">&gt;</span> <span class="integer">0</span></code> will test whether <kbd>shift</kbd> was being held down).</p>
    <h4>Key Press Detection</h4>
    <p>Detecting key presses (rather than typing in of characters) uses the variables <code class="variable">?key</code> and <code class="variable">?kshift</code>, and the function <code class="function">keystatus</code>. <code class="variable">?key</code> gives the code of the last key to be pressed – these codes can be tested using the special keycode constants <code class="constant">\\alt</code>, <code class="constant">\\backspace</code>, <code class="constant">\\capslock</code>, <code class="constant">\\ctrl</code>, <code class="constant">\\delete</code>, <code class="constant">\\down</code>, <code class="constant">\\end</code>, <code class="constant">\\escape</code>, <code class="constant">\\home</code>, <code class="constant">\\insert</code>, <code class="constant">\\left</code>, <code class="constant">\\lwin</code>, <code class="constant">\\pgdn</code>, <code class="constant">\\pgup</code>, <code class="constant">\\return</code>, <code class="constant">\\right</code>, <code class="constant">\\rwin</code>, <code class="constant">\\shift</code>, <code class="constant">\\space</code>, <code class="constant">\\tab</code>, and <code class="constant">\\up</code>, as well as <code class="constant">\\a</code> to <code class="constant">\\z</code>, <code class="constant">\\0</code> to <code class="constant">\\9</code>, <code class="constant">\\#</code>, <code class="constant">\\=</code> etc. Keys on the numeric keypad have codes <code class="constant">\\#0</code>, <code class="constant">\\#1</code> etc., and function keys <code class="constant">\\f1</code>, <code class="constant">\\f2</code> etc. All these stand for numeric values (e.g. <code class="constant">\\return</code> is <span class="integer">13</span>, <code class="constant">\\escape</code> is <span class="integer">27</span>), but <code><span class="keyword">if</span> <span class="variable">?key</span> <span class="operator">=</span> <span class="constant">\return</span></code> is easier to understand than <code><span class="keyword">if</span> <span class="variable">?key</span> <span class="operator">=</span> <span class="integer">13</span></code>.</p>
    <p>Like the mouse-click functions, <code class="variable">?key</code> becomes negative after the key is released, so <code><span class="keyword">repeat</span> <span class="keyword">until</span> <span class="variable">?key</span> <span class="operator">=</span> <span class="operator">-</span><span class="constant">\\a</span></code> will wait until the <kbd>A</kbd> key has been released. If you want to identify the last key whether it is still pressed or not, use <code class="function">abs</code> (e.g. <code><span class="keyword">if</span> <span class="function">abs</span>(<span class="variable">?key</span>) <span class="operator">=</span> <span class="constant">\\a</span> <span class="keyword">then</span> <span class="meta-comment">&hellip;</span></code>).</p>
    <p>Whenever a key is pressed, the variable <code class="variable">?kshift</code> gives its &lsquo;shift-status&rsquo;, calculated in the same way as <code class="variable">?click</code> (i.e. <span class="integer">128</span> plus <span class="integer">8</span> if <kbd>shift</kbd> was down, <span class="integer">16</span> for <kbd>alt</kbd>, <span class="integer">32</span> for <kbd>ctrl</kbd>, and turning negative after the key is released). So to test if <kbd>ctrl</kbd> was down on the last keypress, use <code><span class="keyword">if</span> (<span class="function">abs</span>(<span class="variable">?kshift</span>) <span class="operator">and</span> <span class="integer">32</span>) <span class="operator">&gt;</span> <span class="integer">0</span></code>, with <code class="operator">and</code> here acting as a bitwise boolean operator.</p>
    <p>To recover the shift-status for the last press of the <kbd>X</kbd> key (say), use <code><span class="function">keystatus</span>(<span class="constant">\\x</span>)</code>, which can tell you (a) whether <kbd>shift</kbd> / <kbd>alt</kbd> / <kbd>ctrl</kbd> were down; (b) whether the <kbd>X</kbd> is still pressed (since <code class="function">keystatus</code> goes negative on release); (c) whether <kbd>X</kbd> has been pressed at all (since all of these input codes are set to <span class="integer">-1</span> initially, and can be reset to <span class="integer">-1</span> using <code><span class="function">reset</span>(<span class="constant">\\x</span>)</code> etc.).</p>
    <h4>Keyboard Input</h4>
    <p>The system provides a <i>keyboard buffer</i> to store typed characters. Initially this is set to store up to 32 characters, but can be extended using e.g. <code><span class="function">keybuffer</span>(<span class="integer">50</span>)</code>. To read from the buffer into a string, use e.g. <code><span class="variable">s</span> <span class="operator">:=</span> <span class="function">read</span>(<span class="integer">10</span>)</code>, which reads up to 10 characters (depending on how many are in the buffer). <code><span class="function">keystatus</span>(<span class="constant">\\keybuffer</span>)</code> returns the number of characters it contains, and <code><span class="function">reset</span>(<span class="constant">\\keybuffer</span>)</code> flushes it.</p>
    <p><code><span class="variable">s</span> <span class="operator">:=</span> <span class="function">readln</span></code> reads a line of text, waiting until the <kbd>return</kbd> key is pressed and then making <code class="variable">s</code> equal to what has been typed into the buffer (discarding the <kbd>return</kbd> character).</p>
    <p>The function <code class="function">detect</code> waits a given time for some input to be received (e.g. a specific key pressed), and returns <code class="constant">true</code> when that input is received, or <code class="constant">false</code> if it is not received in time. Thus <code><span class="keyword">if</span> <span class="function">detect</span>(<span class="constant">\\escape</span>, <span class="integer">5000</span>) <span class="keyword">then</span> <span class="meta-comment">&hellip;</span> <span class="keyword">else</span> <span class="meta-comment">&hellip;</span></code> gives 5 seconds to press the <kbd>escape</kbd> key (meanwhile continuing to collect any typed characters in the keyboard buffer). By default, text that goes into the keyboard buffer is also &lsquo;echoed&rsquo; to the console (below the Canvas), along with text that is output (using <code class="function">write</code> or <code class="function">writeln</code>). This behaviour can be turned on and off with <code><span class="function">keyecho</span>(<span class="constant">true</span>)</code> and <code><span class="function">keyecho</span>(<span class="constant">false</span>)</code>.</p>
` }),
];

const Python = [
  create('div', { content: `    <h3>User Input</h3>
    <p>The facilities for user input – via keyboard or mouse – are designed to be as straightforward and comprehensible as possible, while operating strictly through simple processes that are consistent with the workings of the <i>Turtle Machine</i>.</p>
    <h4>Mouse Position Detection</h4>
    <p>The x- and y-coordinates of the mouse&rsquo;s current position can be found at any time by using the special global variables <code class="variable">?mousex</code> and <code class="variable">?mousey</code> – these do not require the mouse to be clicked.</p>
    <h4>Mouse Click Detection</h4>
    <p>When a mouse click is performed, the x- and y-coordinates of the click position are remembered by the variables <code class="variables">?clickx</code> and <code class="variables">?clicky</code>. However to identify the type of click, use the variable <code class="variable">?click</code>, which is initially set to a value of <span class="integer">-1</span>, but after any click has taken place is set to a numerical value of <span class="integer">128</span> plus additions as follows:</p>
    <table class="help-table">
      <tr><td class="integer">1</td><td>if the click was with the left mouse button</td></tr>
      <tr><td class="integer">2</td><td>if the click was with the right mouse button</td></tr>
      <tr><td class="integer">4</td><td>if the click was with the middle mouse button</td></tr>
      <tr><td class="integer">8</td><td>if the shift key was held down while clicking</td></tr>
      <tr><td class="integer">16</td><td>if the alt key was held down while clicking</td></tr>
      <tr><td class="integer">32</td><td>if the ctrl key was held down while clicking</td></tr>
      <tr><td class="integer">64</td><td>if it was a double-click</td></tr>
    </table>
    <p>So if <code><span class="variable">n</span> <span class="operator">=</span> <span class="function">?click</span></code> makes <code class="variable">n</code> equal to <span class="integer">137</span> (<span class="integer">128</span> <span class="operator">+</span> <span class="integer">8</span> <span class="operator">+</span> <span class="integer">1</span>), this indicates that a left-click is currently under way, with the <kbd>shift</kbd> key held down. When the click event is finished, the <code class="variable">?click</code> variable will become negative. Thus if <code class="variable">?click</code> returns a value of <span class="integer">-137</span>, this indicates that the last click event – now finished – was shift+left; the coordinate position of that click can still be identified – until the next click takes place – as (<code class="variable">?clickx</code>, <code class="variable">?clicky</code>). On a left-click, the variable <code class="variable">?lmouse</code> records the relevant value (as calculated above); likewise <code class="variable">?rmouse</code> and <code class="variable">?mmouse</code> record any right-click or middle-click. Again, these are all made negative when the click is released, so an empty loop like:</p>
    <pre>  <span class="keyword">while</span> <span class="operator">not</span>(<span class="variable">?lmouse</span> <span class="operator">&gt;</span> <span class="integer">0</span>):
    <span class="keyword">pass</span>  <span class="meta-comment">{ this statement does nothing! }</span></pre>
    <p>waits for a left-click with the mouse. Afterwards, <code class="variable">?clickx</code> and <code class="variable">?clicky</code> indicate where that click event occurred, and <code class="variable">?click</code> can be queried using the bitwise <code class="operator">and</code> operator to discover which special keys were pressed (e.g. <code><span class="keyword">if</span> (<span class="function">abs</span>(<span class="click">?click</span>) <span class="operator">and</span> <span class="integer">8</span>) <span class="operator">&gt;</span> <span class="integer">0</span></code> will test whether <kbd>shift</kbd> was being held down).</p>
    <h4>Key Press Detection</h4>
    <p>Detecting key presses (rather than typing in of characters) uses the variables <code class="variable">?key</code> and <code class="variable">?kshift</code>, and the function <code class="function">keystatus</code>. <code class="variable">?key</code> gives the code of the last key to be pressed – these codes can be tested using the special keycode constants <code class="constant">\\alt</code>, <code class="constant">\\backspace</code>, <code class="constant">\\capslock</code>, <code class="constant">\\ctrl</code>, <code class="constant">\\delete</code>, <code class="constant">\\down</code>, <code class="constant">\\end</code>, <code class="constant">\\escape</code>, <code class="constant">\\home</code>, <code class="constant">\\insert</code>, <code class="constant">\\left</code>, <code class="constant">\\lwin</code>, <code class="constant">\\pgdn</code>, <code class="constant">\\pgup</code>, <code class="constant">\return</code>, <code class="constant">\right</code>, <code class="constant">\\rwin</code>, <code class="constant">\\shift</code>, <code class="constant">\\space</code>, <code class="constant">\\tab</code>, and <code class="constant">\\up</code>, as well as <code class="constant">\\a</code> to <code class="constant">\\z</code>, <code class="constant">\\0</code> to <code class="constant">\\9</code>, <code class="constant">\\#</code>, <code class="constant">\\=</code> etc. Keys on the numeric keypad have codes <code class="constant">\\#0</code>, <code class="constant">\\#1</code> etc., and function keys <code class="constant">\\f1</code>, <code class="constant">\\f2</code> etc. All these stand for numeric values (e.g. <code class="constant">\\return</code> is <span class="integer">13</span>, <code class="constant">\\escape</code> is <span class="integer">27</span>), but <code><span class="keyword">if</span> <span class="variable">?key</span> <span class="operator">=</span> <span class="constant">\return</span></code> is easier to understand than <code><span class="keyword">if</span> <span class="variable">?key</span> <span class="operator">=</span> <span class="integer">13</span></code>.</p>
    <p>Like the mouse-click variables, <code class="variable">?key</code> becomes negative after the key is released, so <code><span class="keyword">while</span> <span class="operator">not</span>(<span class="variable">?key</span> <span class="operator">=</span> <span class="operator">-</span><span class="constant">\\a</span>): <span class="keyword">pass</span></code> will wait until the <kbd>A</kbd> key has been released. If you want to identify the last key, whether it is still pressed or not, use <code class="function">abs</code> (e.g. <code><span class="keyword">if</span> <span class="function">abs</span>(<span class="variable">?key</span>) <span class="operator">=</span> <span class="constant">\\a</span>: <span class="meta-comment">&hellip;</span></code>).</p>
    <p>Whenever a key is pressed, the variable <code class="variable">?kshift</code> gives its &lsquo;shift-status&rsquo;, calculated in the same way as <code class="variable">?click</code> (i.e. <span class="integer">128</span> plus <span class="integer">8</span> if <kbd>shift</kbd> was down, <span class="integer">16</span> for <kbd>alt</kbd>, <span class="integer">32</span> for <kbd>ctrl</kbd>, and turning negative after the key is released). So to test if <kbd>ctrl</kbd> was down on the last keypress, use <code><span class="keyword">if</span> (<span class="function">abs</span>(<span class="variable">?kshift</span>) <span class="operator">and</span> <span class="integer">32</span>) <span class="operator">&gt;</span> <span class="integer">0</span></code>, with <code class="operator">and</code> here acting as a bitwise boolean operator.</p>
    <p>To recover the shift-status for the last press of the <kbd>X</kbd> key (say), use <code><span class="function">keystatus</span>(<span class="constant">\\x</span>)</code>, which can tell you (a) whether <kbd>shift</kbd> / <kbd>alt</kbd> / <kbd>ctrl</kbd> were down; (b) whether the <kbd>X</kbd> is still pressed (since <code class="function">keystatus</code> goes negative on release); (c) whether <kbd>X</kbd> has been pressed at all (since all of these input codes are set to <span class="integer">-1</span> initially, and can be reset to <span class="integer">-1</span> using <code><span class="function">reset</span>(<span class="constant">\\x</span>)</code> etc.).</p>
    <h4>Keyboard Input</h4>
    <p>The system provides a <i>keyboard buffer</i> to store typed characters. Initially this is set to store up to 32 characters, but can be extended using e.g. <code><span class="function">keybuffer</span>(<span class="integer">50</span>)</code>. To read from the buffer into a string, use e.g. <code><span class="variable">s</span> <span class="operator">=</span> <span class="function">read</span>(<span class="integer">10</span>)</code>, which reads up to 10 characters (depending on how many are in the buffer). <code><span class="function">keystatus</span>(<span class="constant">\\keybuffer</span>)</code> returns the number of characters it contains, and <code><span class="function">reset</span>(<span class="constant">\\keybuffer</span>)</code> flushes it.</p>
    <p><code><span class="variable">s</span> <span class="operator">=</span> <span class="function">readln</span></code> reads a line of text, waiting until the <kbd>return</kbd> key is pressed and then making <code class="variable">s</code> equal to what has been typed into the buffer (discarding the <kbd>return</kbd> character).</p>
    <p>The function <code class="function">detect</code> waits a given time for some input to be received (e.g. a specific key pressed), and returns <code class="constant">True</code> when that input is received, or <code class="constant">False</code> if it is not received in time. Thus <code><span class="keyword">if</span> <span class="function">detect</span>(<span class="constant">\\escape</span>, <span class="integer">5000</span>): <span class="meta-comment">&hellip;</span> <span class="keyword">else</span>: <span class="meta-comment">&hellip;</span></code> gives 5 seconds to press the <kbd>escape</kbd> key (meanwhile continuing to collect any typed characters in the keyboard buffer). By default, text that goes into the keyboard buffer is also &lsquo;echoed&rsquo; to the console (below the Canvas), along with text that is output (using <code class="function">write</code> or <code class="function">writeln</code>). This behaviour can be turned on and off with <code><span class="function">keyecho</span>(<span class="constant">True</span>)</code> and <code><span class="function">keyecho</span>(<span class="constant">False</span>)</code>.</p>
` }),
];

const text = { BASIC, Pascal, Python };

const input = create('div');

const refresh = (language) => {
  input.innerHTML = '';
  text[language].forEach(x => input.appendChild(x));
  Array.from(input.querySelectorAll('code')).forEach((x) => {
    x.innerHTML = highlight(x.innerHTML, language); // eslint-disable-line
  });
};

refresh(session.language.get());
signals.on('language-changed', refresh);

module.exports = input;
