import React from "react";

export default function SideBar(props) {

  return (
    <>
      <div className="sidebar">
        {props.showExplorer ? (
          <div className="iconWrapper">
            <div title="File Pioneer (Ctrl + E)" id="filepioneer" className="sidebaricons" onClick={props.toggleAriaExpandedfilepioneer} >
              <i className="fa-regular fa-file fa-xl"></i>
            </div>
            <span className="sidebarIconBar"></span>
          </div>
        ) : null}
        {props.showSearch ? (
          <div className="iconWrapper">
            <div id="search" className="sidebaricons" onClick={props.toggleAriaExpandedsearch}>
              <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </div>
            <span className="sidebarIconBar"></span>
          </div>
        ) : null}

        {props.showExtensions ? (
          <div className="iconWrapper">
            <div id="extensions" className="sidebaricons" onClick={props.toggleAriaExpandedextensions}>
              <i className="fa-solid fa-puzzle-piece fa-xl"></i>
            </div>
            <span className="sidebarIconBar"></span>
          </div>
        ) : null}

        {props.showDebug ? (
          <div className="iconWrapper">
            <div id="debug" className="sidebaricons" onClick={props.toggleAriaExpandedebug}>
              <i className="fa-solid  fa-bug-slash fa-xl"></i>
            </div>
            <span className="sidebarIconBar"></span>
          </div>
        ) : null}

        {props.showGit ? (
          <div className="iconWrapper">
            <div id="git" className="sidebaricons" onClick={props.toggleAriaExpandedgit}>
              <i className="fa-brands  fa-git-alt fa-xl"></i>
            </div>
            <span className="sidebarIconBar"></span>
          </div>
        ) : null}

        {props.showGitHub ? (
          <div className="iconWrapper">
            <div id="github" className="sidebaricons" onClick={props.toggleAriaExpandedgithub}>
              <i className="fa-brands fa-github fa-xl"></i>
            </div>
            <span className="sidebarIconBar"></span>
          </div>
        ) : null}

        {/* <div className="iconWrapper">
          <div id="codeblocks" className="sidebaricons" onClick={props.toggleAriaExpandedcodeblocks}>
            <i className="fa-solid fa-puzzle-piece fa-xl"></i>
          </div>
          <span className="sidebarIconBar"></span>
        </div> */}
      </div>
    </>
  );
}
