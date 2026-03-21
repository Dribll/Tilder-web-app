import React from 'react';
import PropTypes from 'prop-types';

function MenuBar(props) {
  function quit() {
    window.close();
  }

  return (
    <header>
      <nav>
        <div id="sidebarControls">
          <div id="header_icon">
            <img src="/Tilder_icon.png" alt="tilder_icon_header" aria-label="Tilder" />
          </div>
          <div className="navigation">
            <div className="dropdown">
              <span className="dropdown-trigger-btn">{props.file}</span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={props.triggerNewFile}>New File</li>
                  <li onClick={props.triggerNewFolder}>New Folder</li>
                  <li>New Window</li>
                  <li>New Tab</li>
                  <hr className="dropdowncontent-hr" />
                  <li onClick={props.triggerOpenFile}>Open File</li>
                  <li onClick={props.triggerOpenFolder}>Open Folder</li>
                  <li>Open Recent</li>
                  <hr className="dropdowncontent-hr" />
                  <li onClick={props.saveActiveFile}>Save</li>
                  <li onClick={props.saveAsActiveFile}>Save As</li>
                  <li onClick={props.saveWorkspaceAs}>Save Workspace As</li>
                  <li>Change Save Root Directory</li>
                  <hr className="dropdowncontent-hr" />
                  <li onClick={quit}>Quit Editor</li>
                </ul>
              </div>
            </div>
            <div className="dropdown">
              <span className="dropdown-trigger-btn">{props.edit}</span>
              <div className="dropdown-content">
                <li onClick={props.undo}>Undo</li>
                <li onClick={props.redo}>Redo</li>
                <hr className="dropdowncontent-hr" />
                <li onClick={props.cut}>Cut</li>
                <li onClick={props.copy}>Copy</li>
                <li onClick={props.paste}>Paste</li>
                <li onClick={props.selectAll}>Select All</li>
                <hr className="dropdowncontent-hr" />
                <li onClick={props.find}>Find</li>
                <li onClick={props.replace}>Replace</li>
                <li>Find in Files</li>
                <li>Replace in Files</li>
              </div>
            </div>
            <div className="dropdown">
              <span className="dropdown-trigger-btn">{props.view}</span>
              <div className="dropdown-content">
                <li>Command Palette</li>
                <li>Open View</li>
                <hr className="dropdowncontent-hr" />
                <li>Explorer</li>
                <li>Search</li>
                <li>Source Control</li>
                <li>Run</li>
                <li>Extensions</li>
                <hr className="dropdowncontent-hr" />
                <li>Problems</li>
                <li>Output</li>
                <li>Debug Console</li>
                <li>Terminal</li>
              </div>
            </div>
            <div className="dropdown">
              <span className="dropdown-trigger-btn">{props.go}</span>
              <div className="dropdown-content">
                <li>Switch Editor</li>
                <li>Switch Group</li>
                <hr className="dropdowncontent-hr" />
                <li>Go to File</li>
                <li>Go to Symbol in Workspace</li>
                <li>Go to Symbol in Editor</li>
                <li>Go to Definition</li>
                <li>Go to References</li>
              </div>
            </div>
            <div className="dropdown">
              <span className="dropdown-trigger-btn">{props.run_debug}</span>
              <div className="dropdown-content">
                <li>Start Debugging</li>
                <li>Run Without Debugging</li>
                <li>Stop Debugging</li>
                <li>Restart Debugging</li>
              </div>
            </div>
            <div className="dropdown">
              <span className="dropdown-trigger-btn">{props.help}</span>
            </div>
          </div>
        </div>
        <div id="sidebarSettings">
          <span className="dropdown-trigger-btn" onClick={props.toggleInfoDisplay}>
            <i className="fa-solid fa-circle-info"></i>
          </span>
          <span className="dropdown-trigger-btn" onClick={props.openSettings}>
            <i className="fa-solid fa-sliders"></i>
          </span>
          <span className="dropdown-trigger-btn" onClick={props.openExtensions}>
            <i className="fa-solid fa-puzzle-piece"></i>
          </span>
        </div>
      </nav>
    </header>
  );
}

export default MenuBar;

MenuBar.defaultProps = {
  file: 'File',
  edit: 'Edit',
  view: 'View',
  go: 'Go',
  run_debug: 'Run & Debug',
  help: 'Help',
};

MenuBar.propTypes = {
  file: PropTypes.string.isRequired,
  edit: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  go: PropTypes.string.isRequired,
  run_debug: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
};
