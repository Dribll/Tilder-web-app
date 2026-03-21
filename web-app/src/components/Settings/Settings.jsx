import React, { useState, useEffect, useRef } from 'react';
import defaultSettings from './defaultSettings.js';


export default function Settings({ modalType, settings, setSettings }) {
    const [activeCategory, setActiveCategory] = useState("Appearance");

    // ⭐ UNIVERSAL UPDATE FUNCTION
    function updateSetting(key, value) {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const categories = [
        "Appearance",
        "Cursor",
        "Layout",
        "Editing",
        "Suggestions",
        "Selection",
        "Scrolling",
        "Advanced"
    ];

    const [appearanceDisplay, setAppearanceDisplay] = useState('flex');
    const [cursorDisplay, setCursorDisplay] = useState('none');
    const [layoutDisplay, setLayoutDisplay] = useState('none');
    const [editingDisplay, setEditingDisplay] = useState('none');
    const [suggestionsDisplay, setSuggestionsDisplay] = useState('none');
    const [selectionDisplay, setSelectionDisplay] = useState('none');
    const [scrollingDisplay, setScrollingDisplay] = useState('none');
    const [advancedDisplay, setAdvancedDisplay] = useState('none');

    function toggleAppearance() {
        if (appearanceDisplay === 'none') {
            setAppearanceDisplay('flex');
            setCursorDisplay('none');
            setLayoutDisplay('none');
            setEditingDisplay('none');
            setSuggestionsDisplay('none');
            setSelectionDisplay('none');
            setScrollingDisplay('none');
            setAdvancedDisplay('none');
        }
    }

    function toggleCursor() {
        if (cursorDisplay === 'none') {
            setAppearanceDisplay('none');
            setCursorDisplay('flex');
            setLayoutDisplay('none');
            setEditingDisplay('none');
            setSuggestionsDisplay('none');
            setSelectionDisplay('none');
            setScrollingDisplay('none');
            setAdvancedDisplay('none');
        }
    }

    function toggleLayout() {
        if (layoutDisplay === 'none') {
            setAppearanceDisplay('none');
            setCursorDisplay('none');
            setLayoutDisplay('flex');
            setEditingDisplay('none');
            setSuggestionsDisplay('none');
            setSelectionDisplay('none');
            setScrollingDisplay('none');
            setAdvancedDisplay('none');
        }
    }

    function toggleEditing() {
        if (editingDisplay === 'none') {
            setAppearanceDisplay('none');
            setCursorDisplay('none');
            setLayoutDisplay('none');
            setEditingDisplay('flex');
            setSuggestionsDisplay('none');
            setSelectionDisplay('none');
            setScrollingDisplay('none');
            setAdvancedDisplay('none');
        }
    }

    function toggleSuggestions() {
        if (suggestionsDisplay === 'none') {
            setAppearanceDisplay('none');
            setCursorDisplay('none');
            setLayoutDisplay('none');
            setEditingDisplay('none');
            setSuggestionsDisplay('flex');
            setSelectionDisplay('none');
            setScrollingDisplay('none');
            setAdvancedDisplay('none');
        }
    }

    function toggleSelection() {
        if (selectionDisplay === 'none') {
            setAppearanceDisplay('none');
            setCursorDisplay('none');
            setLayoutDisplay('none');
            setEditingDisplay('none');
            setSuggestionsDisplay('none');
            setSelectionDisplay('flex');
            setScrollingDisplay('none');
            setAdvancedDisplay('none');
        }
    }

    function toggleScrolling() {
        if (scrollingDisplay === 'none') {
            setAppearanceDisplay('none');
            setCursorDisplay('none');
            setLayoutDisplay('none');
            setEditingDisplay('none');
            setSuggestionsDisplay('none');
            setSelectionDisplay('none');
            setScrollingDisplay('flex');
            setAdvancedDisplay('none');
        }
    }

    function toggleAdvanced() {
        if (advancedDisplay === 'none') {
            setAppearanceDisplay('none');
            setCursorDisplay('none');
            setLayoutDisplay('none');
            setEditingDisplay('none');
            setSuggestionsDisplay('none');
            setSelectionDisplay('none');
            setScrollingDisplay('none');
            setAdvancedDisplay('flex');
        }
    }

    function handleCategoryClick(cat) {
        setActiveCategory(cat);
        if (cat === 'Appearance') toggleAppearance();
        if (cat === 'Cursor') toggleCursor();
        if (cat === 'Layout') toggleLayout();
        if (cat === 'Editing') toggleEditing();
        if (cat === 'Suggestions') toggleSuggestions();
        if (cat === 'Selection') toggleSelection();
        if (cat === 'Scrolling') toggleScrolling();
        if (cat === 'Advanced') toggleAdvanced();
    }

    // ⭐ SEARCH FUNCTION


    function handleSearch(searchValue) {

        const key = Object.keys(settingCategoryMap).find(k =>
            k.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (!key) return;

        const category = settingCategoryMap[key];

        setActiveCategory(category);
        handleCategoryClick(category);

        // Scroll after category renders
        setTimeout(() => {
            const el = document.getElementById(key);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.classList.add("highlight");

                setTimeout(() => {
                    el.classList.remove("highlight");
                }, 1500);
            }
        }, 100);
    }

    const settingCategoryMap = {

        // =========================
        // APPEARANCE
        // =========================

        fontSize: "Appearance",
        fontFamily: "Appearance",
        fontWeight: "Appearance",
        lineHeight: "Appearance",
        letterSpacing: "Appearance",
        fontLigatures: "Appearance",

        lineNumbers: "Appearance",
        lineNumbersMinChars: "Appearance",

        minimap: "Appearance",

        renderWhitespace: "Appearance",
        renderControlCharacters: "Appearance",
        renderLineHighlight: "Appearance",
        renderIndentGuides: "Appearance",
        renderFinalNewline: "Appearance",

        bracketPairColorization: "Appearance",
        colorDecorators: "Appearance",
        codeLens: "Appearance",
        lightbulb: "Appearance",
        parameterHints: "Appearance",
        guides: "Appearance",


        // =========================
        // CURSOR
        // =========================

        cursorStyle: "Cursor",
        cursorWidth: "Cursor",
        cursorBlinking: "Cursor",
        cursorSmoothCaretAnimation: "Cursor",
        cursorSurroundingLines: "Cursor",
        cursorSurroundingLinesStyle: "Cursor",

        multiCursorModifier: "Cursor",
        multiCursorMergeOverlapping: "Cursor",


        // =========================
        // LAYOUT
        // =========================

        wordWrap: "Layout",
        wordWrapColumn: "Layout",
        wordWrapOverride1: "Layout",
        wordWrapOverride2: "Layout",

        folding: "Layout",
        foldingStrategy: "Layout",
        foldingHighlight: "Layout",

        rulers: "Layout",
        automaticLayout: "Layout",


        // =========================
        // EDITING
        // =========================

        tabSize: "Editing",
        insertSpaces: "Editing",
        detectIndentation: "Editing",
        trimAutoWhitespace: "Editing",

        autoClosingBrackets: "Editing",
        autoClosingQuotes: "Editing",
        autoClosingDelete: "Editing",
        autoClosingOvertype: "Editing",

        autoIndent: "Editing",

        formatOnType: "Editing",
        formatOnPaste: "Editing",

        dragAndDrop: "Editing",
        copyWithSyntaxHighlighting: "Editing",


        // =========================
        // SUGGESTIONS
        // =========================

        quickSuggestions: "Suggestions",
        quickSuggestionsDelay: "Suggestions",
        suggestOnTriggerCharacters: "Suggestions",
        acceptSuggestionOnEnter: "Suggestions",
        suggestSelection: "Suggestions",


        // =========================
        // SELECTION
        // =========================

        selectOnLineNumbers: "Selection",
        roundedSelection: "Selection",


        // =========================
        // SCROLLING
        // =========================

        scrollBeyondLastLine: "Scrolling",
        scrollBeyondLastColumn: "Scrolling",
        smoothScrolling: "Scrolling",
        mouseWheelScrollSensitivity: "Scrolling",
        fastScrollSensitivity: "Scrolling",
        mouseWheelZoom: "Scrolling",


        // =========================
        // ADVANCED
        // =========================

        matchBrackets: "Advanced",
        hover: "Advanced",
        links: "Advanced",
        find: "Advanced",
        contextmenu: "Advanced",
        readOnly: "Advanced",
        accessibilitySupport: "Advanced",
        codeActionsOnSave: "Advanced"

    };

    function resetSetting(e) {
        const keyPath = e.target.name; // e.g. "fontSize" OR "hover.enabled"

        const keys = keyPath.split(".");

        setSettings(prev => {
            const newSettings = { ...prev };

            if (keys.length === 1) {
                // Normal setting
                newSettings[keys[0]] = defaultSettings[keys[0]];
            } else {
                // Nested setting
                const [parent, child] = keys;

                newSettings[parent] = {
                    ...prev[parent],
                    [child]: defaultSettings[parent][child]
                };
            }

            return newSettings;
        });
    }

    function ResetButton({ name }) {

        const keys = name.split(".");

        let currentValue;
        let defaultValue;

        if (keys.length === 1) {
            currentValue = settings[keys[0]];
            defaultValue = defaultSettings[keys[0]];
        } else {
            const [parent, child] = keys;
            currentValue = settings[parent][child];
            defaultValue = defaultSettings[parent][child];
        }

        const isDefault =
            JSON.stringify(currentValue) === JSON.stringify(defaultValue);

        return (
            <button
                type="button"
                name={name}
                onClick={resetSetting}
                disabled={isDefault}
                className={`resetBtn ${isDefault ? "disabled" : ""}`}
            >
                Reset
            </button>
        );
    }

    function resetAllSettings() {
        setSettings(defaultSettings);
    }

    function resetCategory(categoryName) {

        const keysToReset = Object.keys(settingCategoryMap)
            .filter(key => settingCategoryMap[key] === categoryName);

        setSettings(prev => {
            const newSettings = { ...prev };

            keysToReset.forEach(key => {

                if (key.includes(".")) {
                    const [parent, child] = key.split(".");
                    newSettings[parent] = {
                        ...prev[parent],
                        [child]: defaultSettings[parent][child]
                    };
                } else {
                    newSettings[key] = defaultSettings[key];
                }

            });

            return newSettings;
        });
    }
    return (

        <div className={`settings d-${modalType === "Settings" ? 'flex' : 'none'}`}>
            <div className="settingsCategories">
                <div className="settingsContentsWrapper">
                    {categories.map(cat => (
                        <div key={cat} className={`settingsItem ${activeCategory === cat ? "active" : ""}`} onClick={() => handleCategoryClick(cat)} >
                            <div className="bullet"></div>
                            {cat}
                        </div>
                    ))}
                </div>
                <div className="resetdiv">
                    <button className="resetBulk" onClick={resetAllSettings}>Reset All</button>
                    <button className="resetBulk" onClick={() => resetCategory(activeCategory)}>Reset Category</button>
                </div>
            </div>
            <div className="settingsCategoryContents">
                <div className="settingsSearch">
                    <input
                        type="text"
                        placeholder="Search settings..."
                        onChange={(e) => handleSearch(e.target.value)}
                        id='settingsSearchBar'
                        className='d-flex'
                    />
                </div>
                <div className={`settingsCategoryContents easterEgg d-${appearanceDisplay}`} id='appearance' onClick={toggleAppearance}>
                    <h5>Appearance</h5>
                    <hr />

                    <h6 className='settingsItem'>Font Size</h6>
                    <p className="settingsDescription">Controls the size of text in the editor (in pixels).
                        Increasing this makes code easier to read.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.fontSize}
                            onChange={(e) =>
                                updateSetting("fontSize", Number(e.target.value))
                            }
                        />
                        <ResetButton name="fontSize" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Font Family</h6>
                    <p className="settingsDescription">Sets the font used to display code.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="text"
                            value={settings.fontFamily}
                            onChange={(e) =>
                                updateSetting("fontFamily", e.target.value)
                            }
                        />
                        <ResetButton name="fontFamily" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Font Weight</h6>
                    <p className="settingsDescription">Controls how bold or light the font appears.
                        Common values: normal, bold, 300, 600.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.fontWeight}
                            onChange={(e) =>
                                updateSetting("fontWeight", e.target.value)
                            }
                        >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                            <option value="600">600</option>
                        </select>
                        <ResetButton name="fontWeight" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Line Height</h6>
                    <p className="settingsDescription">Controls the vertical spacing between lines of code.
                        Higher values improve readability.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.lineHeight}
                            onChange={(e) =>
                                updateSetting("lineHeight", Number(e.target.value))
                            }
                        />
                        <ResetButton name="lineHeight" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Letter Spacing</h6>
                    <p className="settingsDescription">Adjusts the spacing between characters.
                        Useful for improving readability with certain fonts.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            step="0.1"
                            value={settings.letterSpacing}
                            onChange={(e) =>
                                updateSetting("letterSpacing", Number(e.target.value))
                            }
                        />
                        <ResetButton name="letterSpacing" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Font Ligatures</h6>
                    <p className="settingsDescription">Enables special character combinations for certain fonts.
                        Makes characters like {" => "} render as a single symbol.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.fontLigatures}
                            onChange={(e) =>
                                updateSetting("fontLigatures", e.target.value)
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="fontLigatures" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Line Numbers</h6>
                    <p className="settingsDescription">Controls the display of line numbers in the editor.
                        Options: on, off, relative.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.lineNumbers}
                            onChange={(e) =>
                                updateSetting("lineNumbers", e.target.value)
                            }
                        >
                            <option value="on">On</option>
                            <option value="off">Off</option>
                            <option value="relative">Relative</option>
                        </select>
                        <ResetButton name="lineNumbers" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Line Numbers Min Chars</h6>
                    <p className="settingsDescription">Minimum number of characters reserved for line numbers.
                        Increases space for line numbers but reduces code area.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.lineNumbersMinChars}
                            onChange={(e) =>
                                updateSetting("lineNumbersMinChars", Number(e.target.value))
                            }
                        />
                        <ResetButton name="lineNumbersMinChars" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Minimap</h6>
                    <p className="settingsDescription">Enables a small overview of the code on the side.
                        Provides a visual map of the entire file for easy navigation.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.minimap.enabled}
                            onChange={(e) =>
                                setSettings(prev => ({
                                    ...prev,
                                    minimap: {
                                        ...prev.minimap,
                                        enabled: e.target.value === "true"
                                    }
                                }))
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="minimap.enabled" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Render Whitespace</h6>
                    <p className="settingsDescription">Controls how whitespace characters are displayed.
                        Options may show spaces and tabs visually.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.renderWhitespace}
                            onChange={(e) =>
                                updateSetting("renderWhitespace", e.target.value)
                            }
                        >
                            <option value="none">None</option>
                            <option value="boundary">Boundary</option>
                            <option value="all">All</option>
                        </select>
                        <ResetButton name="renderWhitespace" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Render Control Characters</h6>
                    <p className="settingsDescription">Enables visualization of control characters like null or escape.
                        Helps identify invisible characters in code.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.renderControlCharacters}
                            onChange={(e) =>
                                updateSetting("renderControlCharacters", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="renderControlCharacters" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Render Line Highlight</h6>
                    <p className="settingsDescription">Highlights the line where the cursor is currently placed.
                        Improves focus while coding.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.renderLineHighlight}
                            onChange={(e) =>
                                updateSetting("renderLineHighlight", e.target.value)
                            }
                        >
                            <option value="none">None</option>
                            <option value="gutter">Gutter</option>
                            <option value="line">Line</option>
                            <option value="all">All</option>
                        </select>
                        <ResetButton name="renderLineHighlight" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Render Indent Guides</h6>
                    <p className="settingsDescription">Shows vertical lines to indicate indentation levels.
                        Helps visualize code structure.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.renderIndentGuides}
                            onChange={(e) =>
                                updateSetting("renderIndentGuides", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="renderIndentGuides" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Render Final Newline</h6>
                    <p className="settingsDescription">Ensures that files end with a newline character.
                        Important for compatibility with certain tools and languages.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.renderFinalNewline}
                            onChange={(e) =>
                                updateSetting("renderFinalNewline", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="renderFinalNewline" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Bracket Pair Colorization</h6>
                    <p className="settingsDescription">Enables color coding of matching brackets.
                        Makes it easier to identify code blocks and nesting.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.bracketPairColorization.enabled}
                            onChange={(e) =>
                                setSettings(prev => ({
                                    ...prev,
                                    bracketPairColorization: {
                                        ...prev.bracketPairColorization,
                                        enabled: e.target.value === "true"
                                    }
                                }))
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="bracketPairColorization.enabled" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Color Decorators</h6>
                    <p className="settingsDescription">Shows color previews for color codes in the editor.
                        Useful for quickly identifying colors in CSS or design files.</p>

                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.colorDecorators}
                            onChange={(e) =>
                                updateSetting("colorDecorators", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="colorDecorators" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Code Lens</h6>
                    <p className="settingsDescription">Displays inline information and actions above code lines.
                        Provides quick access to references, tests, and more.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.codeLens}
                            onChange={(e) =>
                                updateSetting("codeLens", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="codeLens" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Lightbulb</h6>
                    <p className="settingsDescription">Shows a lightbulb icon when code actions are available.
                        Provides quick access to fixes and refactorings.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.lightbulb.enabled}
                            onChange={(e) =>
                                setSettings(prev => ({
                                    ...prev,
                                    lightbulb: {
                                        ...prev.lightbulb,
                                        enabled: e.target.value === "true"
                                    }
                                }))
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="lightbulb.enabled" />
                    </div>
                    <br />

                    <h6 className='settingsItem'>Parameter Hints</h6>
                    <p className="settingsDescription">Shows inline hints for function parameters while typing.
                        Helps remember parameter names and types.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.parameterHints.enabled}
                            onChange={(e) =>
                                setSettings(prev => ({
                                    ...prev,
                                    parameterHints: {
                                        ...prev.parameterHints,
                                        enabled: e.target.value === "true"
                                    }
                                }))
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="parameterHints.enabled" />
                    </div> <br />


                    <h6 className='settingsItem'>Guides</h6>
                    <p className="settingsDescription">Enables various visual guides in the editor, such as bracket pair guides and indentation guides.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.guides.indentation}
                            onChange={(e) =>
                                setSettings(prev => ({
                                    ...prev,
                                    guides: {
                                        ...prev.guides,
                                        indentation: e.target.value === "true"
                                    }
                                }))
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                    </div>
                    <br />

                    <h6 className='settingsItem'>Guides(Bracket pairs)</h6>
                    <p className="settingsDescription">Enables vertical guides for matching brackets, improving code readability.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.guides.bracketPairs}
                            onChange={(e) =>
                                setSettings(prev => ({
                                    ...prev,
                                    guides: {
                                        ...prev.guides,
                                        bracketPairs: e.target.value === "true"
                                    }
                                }))
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="guides.bracketPairs" />
                    </div>
                    <br />

                </div>
                <div className={`settingsCategoryContents easterEgg d-${cursorDisplay}`} id='cursor' onClick={toggleCursor}>
                    <h5>Cursor</h5>
                    <hr />

                    <h6 className="settingsItem">Cursor Style</h6>
                    <p className="settingsDescription">
                        Controls the visual appearance of the cursor.
                        Options: Line, Block, Underline.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.cursorStyle}
                            onChange={(e) =>
                                updateSetting("cursorStyle", e.target.value)
                            }
                        >
                            <option value="line">Line</option>
                            <option value="block">Block</option>
                            <option value="underline">Underline</option>
                        </select>
                        <ResetButton name="cursorStyle" />
                    </div>

                    <br />

                    {/* cursorWidth */}
                    <h6 className="settingsItem">Cursor Width</h6>
                    <p className="settingsDescription">
                        Controls the thickness of the cursor when using line style.
                    </p>
                    <input
                        className="settingsInput"
                        type="number"
                        value={settings.cursorWidth}
                        onChange={(e) =>
                            updateSetting("cursorWidth", Number(e.target.value))
                        }
                    />
                    <br />

                    {/* cursorBlinking */}
                    <h6 className="settingsItem">Cursor Blinking</h6>
                    <p className="settingsDescription">
                        Controls how the cursor blinks.
                        Options: Blink, Smooth, Phase, Expand, Solid.
                    </p>
                    <select
                        className="settingsInput"
                        value={settings.cursorBlinking}
                        onChange={(e) =>
                            updateSetting("cursorBlinking", e.target.value)
                        }
                    >
                        <option value="blink">Blink</option>
                        <option value="smooth">Smooth</option>
                        <option value="phase">Phase</option>
                        <option value="expand">Expand</option>
                        <option value="solid">Solid</option>
                    </select>
                    <br />

                    {/* cursorSmoothCaretAnimation */}
                    <h6 className="settingsItem">Cursor Smooth Caret Animation</h6>
                    <p className="settingsDescription">
                        Enables smooth animation when the cursor moves between positions.
                    </p>
                    <select
                        className="settingsInput"
                        value={settings.cursorSmoothCaretAnimation}
                        onChange={(e) =>
                            updateSetting("cursorSmoothCaretAnimation", e.target.value === "true")
                        }
                    >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </select>
                    <br />

                    {/* cursorSurroundingLines */}
                    <h6 className="settingsItem">Cursor Surrounding Lines</h6>
                    <p className="settingsDescription">
                        Controls the number of lines kept visible above and below the cursor.
                    </p>
                    <input
                        className="settingsInput"
                        type="number"
                        value={settings.cursorSurroundingLines}
                        onChange={(e) =>
                            updateSetting("cursorSurroundingLines", Number(e.target.value))
                        }
                    />
                    <br />

                    {/* cursorSurroundingLinesStyle */}
                    <h6 className="settingsItem">Cursor Surrounding Lines Style</h6>
                    <p className="settingsDescription">
                        Controls when cursor surrounding lines are applied.
                        Options: Default, All.
                    </p>
                    <select
                        className="settingsInput"
                        value={settings.cursorSurroundingLinesStyle}
                        onChange={(e) =>
                            updateSetting("cursorSurroundingLinesStyle", e.target.value)
                        }
                    >
                        <option value="default">Default</option>
                        <option value="all">All</option>
                    </select>
                    <br />

                    {/* multiCursorModifier */}
                    <h6 className="settingsItem">Multi Cursor Modifier</h6>
                    <p className="settingsDescription">
                        Modifier key used to add multiple cursors.
                        Options: Alt, Ctrl/Cmd.
                    </p>
                    <select
                        className="settingsInput"
                        value={settings.multiCursorModifier}
                        onChange={(e) =>
                            updateSetting("multiCursorModifier", e.target.value)
                        }
                    >
                        <option value="alt">Alt</option>
                        <option value="ctrlCmd">Ctrl/Cmd</option>
                    </select>
                    <br />

                    {/* multiCursorMergeOverlapping */}
                    <h6 className="settingsItem">Multi Cursor Merge Overlapping</h6>
                    <p className="settingsDescription">
                        Automatically merges overlapping multi-cursors into a single cursor.
                    </p>
                    <select
                        className="settingsInput"
                        value={settings.multiCursorMergeOverlapping}
                        onChange={(e) =>
                            updateSetting("multiCursorMergeOverlapping", e.target.value === "true")
                        }
                    >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </select>
                    <br />

                </div>
                <div className={`settingsCategoryContents easterEgg d-${layoutDisplay}`} id='layout' onClick={toggleLayout}>
                    <h5>Layout</h5>
                    <hr />

                    <h6 className="settingsItem">Word Wrap</h6>
                    <p className="settingsDescription">Controls how lines wrap.</p>
                    <select
                        className="settingsInput"
                        value={settings.wordWrap}
                        onChange={(e) =>
                            updateSetting("wordWrap", e.target.value)
                        }
                    >
                        <option value="off">Off</option>
                        <option value="on">On</option>
                        <option value="wordWrapColumn">Word Wrap Column</option>
                        <option value="bounded">Bounded</option>
                    </select>
                    <br />

                    <h6 className="settingsItem">Word Wrap Column</h6>
                    <p className="settingsDescription">Controls the column at which lines will wrap when wordWrap is set to 'wordWrapColumn' or 'bounded'.</p>
                    <input
                        className="settingsInput"
                        type="number"
                        value={settings.wordWrapColumn}
                        onChange={(e) =>
                            updateSetting("wordWrapColumn", Number(e.target.value))
                        }
                    />
                    <br />

                    <h6 className="settingsItem">Folding</h6>
                    <p className="settingsDescription">Enables code folding, allowing you to collapse and expand sections of code.</p>
                    <select
                        className="settingsInput"
                        value={settings.folding}
                        onChange={(e) =>
                            updateSetting("folding", e.target.value === "true")
                        }
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    <br />

                    <h6 className="settingsItem">Folding Strategy</h6>
                    <p className="settingsDescription">Controls the strategy used for code folding. 'auto' uses language-specific folding, while 'indentation' folds based on indentation levels.</p>
                    <select
                        className="settingsInput"
                        value={settings.foldingStrategy}
                        onChange={(e) =>
                            updateSetting("foldingStrategy", e.target.value)
                        }
                    >
                        <option value="auto">Auto</option>
                        <option value="indentation">Indentation</option>
                    </select>
                    <br />

                    <h6 className="settingsItem">Folding Highlight</h6>
                    <p className="settingsDescription">Highlights folded ranges with a special color to indicate they are collapsed.</p>
                    <select
                        className="settingsInput"
                        value={settings.foldingHighlight}
                        onChange={(e) =>
                            updateSetting("foldingHighlight", e.target.value === "true")
                        }
                    >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </select>
                    <br />

                    <h6 className="settingsItem">Rulers</h6>
                    <p className="settingsDescription">Shows vertical rulers after a certain number of characters. Useful for keeping code within a certain width.</p>
                    <input
                        className="settingsInput"
                        type="number"
                        value={settings.rulers}
                        onChange={(e) =>
                            updateSetting("rulers", Number(e.target.value))
                        }
                    /> <br />

                    <h6 className="settingsItem">Automatic Layout</h6>
                    <p className="settingsDescription">Automatically adjust the editor layout when the container size changes.</p>
                    <select
                        className="settingsInput"
                        value={settings.automaticLayout}
                        onChange={(e) =>
                            updateSetting("automaticLayout", e.target.value === "true")
                        }
                    >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </select>
                    <br />
                </div>
                <div className={`settingsCategoryContents easterEgg d-${editingDisplay}`} id='editing' onClick={toggleEditing}>
                    <h5>Editing</h5>
                    <hr />

                    <h6 className="settingsItem">Tab Size</h6>
                    <p className="settingsDescription">
                        Controls the number of spaces a tab character represents.
                        Common values are 2, 4, or 8.
                    </p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.tabSize}
                            onChange={(e) =>
                                updateSetting("tabSize", Number(e.target.value))
                            }
                        />
                        <ResetButton name="tabSize" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Insert Spaces</h6>
                    <p className="settingsDescription">
                        When pressing Tab, insert spaces instead of a tab character.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.insertSpaces}
                            onChange={(e) =>
                                updateSetting("insertSpaces", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="insertSpaces" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Detect Indentation</h6>
                    <p className="settingsDescription">
                        Automatically detect indentation settings from the file content.
                        Overrides tabSize and insertSpaces if enabled.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.detectIndentation}
                            onChange={(e) =>
                                updateSetting("detectIndentation", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="detectIndentation" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Trim Auto Whitespace</h6>
                    <p className="settingsDescription">
                        Remove automatically inserted whitespace at the end of lines.
                        Helps keep code clean by removing unnecessary spaces.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.trimAutoWhitespace}
                            onChange={(e) =>
                                updateSetting("trimAutoWhitespace", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="trimAutoWhitespace" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Auto Closing Brackets</h6>
                    <p className="settingsDescription">
                        Automatically insert closing brackets after typing an opening bracket.
                        Options control when this behavior occurs.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.autoClosingBrackets}
                            onChange={(e) =>
                                updateSetting("autoClosingBrackets", e.target.value)
                            }
                        >
                            <option value="always">Always</option>
                            <option value="languageDefined">Language Defined</option>
                            <option value="beforeWhitespace">Before Whitespace</option>
                            <option value="never">Never</option>
                        </select>
                        <ResetButton name="autoClosingBrackets" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Auto Closing Quotes</h6>
                    <p className="settingsDescription">
                        Automatically insert closing quotes after typing an opening quote.
                        Options control when this behavior occurs.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.autoClosingQuotes}
                            onChange={(e) =>
                                updateSetting("autoClosingQuotes", e.target.value)
                            }
                        >
                            <option value="always">Always</option>
                            <option value="languageDefined">Language Defined</option>
                            <option value="beforeWhitespace">Before Whitespace</option>
                            <option value="never">Never</option>
                        </select>
                        <ResetButton name="autoClosingQuotes" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Auto Indent</h6>
                    <p className="settingsDescription">
                        Controls the level of automatic indentation when typing, pasting, or moving lines.
                        Higher levels provide more aggressive indentation adjustments.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.autoIndent}
                            onChange={(e) =>
                                updateSetting("autoIndent", e.target.value)
                            }
                        >
                            <option value="none">None</option>
                            <option value="keep">Keep</option>
                            <option value="brackets">Brackets</option>
                            <option value="advanced">Advanced</option>
                            <option value="full">Full</option>
                        </select>
                        <ResetButton name="autoIndent" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Format on Type</h6>
                    <p className="settingsDescription">
                        Automatically format the code when typing in a supported language.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.formatOnType}
                            onChange={(e) =>
                                updateSetting("formatOnType", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="formatOnType" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Format On Paste</h6>
                    <p className="settingsDescription">
                        Automatically format the code when pasting in a supported language.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.formatOnPaste}
                            onChange={(e) =>
                                updateSetting("formatOnPaste", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="formatOnPaste" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Drag and Drop</h6>
                    <p className="settingsDescription">
                        Enable drag and drop editing of text within the editor.
                        Allows moving code by dragging selected text to a new location.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.dragAndDrop}
                            onChange={(e) =>
                                updateSetting("dragAndDrop", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="dragAndDrop" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Copy With Syntax Highlighting</h6>
                    <p className="settingsDescription">
                        When copying code, include syntax highlighting information.
                        Pasting into rich text editors will preserve colors and styles.
                    </p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.copyWithSyntaxHighlighting}
                            onChange={(e) =>
                                updateSetting("copyWithSyntaxHighlighting", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="copyWithSyntaxHighlighting" />
                    </div>
                    <br />
                </div>
                <div className={`settingsCategoryContents easterEgg d-${suggestionsDisplay}`} id='suggestions' onClick={toggleSuggestions}>
                    <h5>Suggestions</h5>
                    <hr />

                    <h6 className="settingsItem">Quick Suggestions</h6>
                    <p className="settingsDescription">Enable IntelliSense suggestions while typing.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.quickSuggestions}
                            onChange={(e) =>
                                updateSetting("quickSuggestions", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="quickSuggestions" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Quick Suggestions Delay</h6>
                    <p className="settingsDescription">Delay in milliseconds before suggestions appear.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.quickSuggestionsDelay}
                            onChange={(e) =>
                                updateSetting("quickSuggestionsDelay", Number(e.target.value))
                            }
                        />
                        <ResetButton name="quickSuggestionsDelay" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Suggest On Trigger Characters</h6>
                    <p className="settingsDescription">Enable suggestions when typing trigger characters like "." or "(".</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.suggestOnTriggerCharacters}
                            onChange={(e) =>
                                updateSetting("suggestOnTriggerCharacters", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="suggestOnTriggerCharacters" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Accept Suggestion On Enter</h6>
                    <p className="settingsDescription">Controls whether suggestions are accepted when pressing Enter.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.acceptSuggestionOnEnter}
                            onChange={(e) =>
                                updateSetting("acceptSuggestionOnEnter", e.target.value)
                            }
                        >
                            <option value="on">On</option>
                            <option value="smart">Smart</option>
                            <option value="off">Off</option>
                        </select>
                        <ResetButton name="acceptSuggestionOnEnter" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Suggest Selection</h6>
                    <p className="settingsDescription">Controls how suggestions are pre-selected when showing the suggest list.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.suggestSelection}
                            onChange={(e) =>
                                updateSetting("suggestSelection", e.target.value)
                            }
                        >
                            <option value="recentlyUsed">Recently Used</option>
                            <option value="recentlyUsedByPrefix">Recently Used By Prefix</option>
                            <option value="first">First</option>
                        </select>
                        <ResetButton name="suggestSelection" />
                    </div>
                    <br />

                </div>
                <div className={`settingsCategoryContents easterEgg d-${selectionDisplay}`} id='selection' onClick={toggleSelection}>
                    <h5>Selection</h5>
                    <hr />

                    <h6 className="settingsItem">Select On Line Numbers</h6>
                    <p className="settingsDescription">Enable selecting lines by clicking on the line numbers.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.selectOnLineNumbers}
                            onChange={(e) =>
                                updateSetting("selectOnLineNumbers", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="selectOnLineNumbers" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Rounded Selection</h6>
                    <p className="settingsDescription">Enable rounded corners on selection.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.roundedSelection}
                            onChange={(e) =>
                                updateSetting("roundedSelection", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="roundedSelection" />
                    </div>
                    <br />
                </div>
                <div className={`settingsCategoryContents easterEgg d-${scrollingDisplay}`} id='scrolling' onClick={toggleScrolling}>
                    <h5>Scrolling</h5>
                    <hr />

                    <h6 className="settingsItem">Scroll Beyond Last Line</h6>
                    <p className="settingsDescription">Allow scrolling past the last line of the file.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.scrollBeyondLastLine}
                            onChange={(e) =>
                                updateSetting("scrollBeyondLastLine", e.target.value === "true")
                            }
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <ResetButton name="scrollBeyondLastLine" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Scroll Beyond Last Column</h6>
                    <p className="settingsDescription">Allow horizontal scrolling beyond the last character.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.scrollBeyondLastColumn}
                            onChange={(e) =>
                                updateSetting("scrollBeyondLastColumn", Number(e.target.value))
                            }
                        />
                        <ResetButton name="scrollBeyondLastColumn" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Smooth Scrolling</h6>
                    <p className="settingsDescription">Enable smooth scrolling.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.smoothScrolling}
                            onChange={(e) =>
                                updateSetting("smoothScrolling", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="smoothScrolling" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Mouse Wheel Scroll Sensitivity</h6>
                    <p className="settingsDescription">Adjust the sensitivity of mouse wheel scrolling.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.mouseWheelScrollSensitivity}
                            onChange={(e) =>
                                updateSetting("mouseWheelScrollSensitivity", Number(e.target.value))
                            }
                        />
                        <ResetButton name="mouseWheelScrollSensitivity" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Fast Scroll Sensitivity</h6>
                    <p className="settingsDescription">Adjust the sensitivity of fast scrolling when holding the Alt key.</p>
                    <div className="settingsInputWrapper">
                        <input
                            className="settingsInput"
                            type="number"
                            value={settings.fastScrollSensitivity}
                            onChange={(e) =>
                                updateSetting("fastScrollSensitivity", Number(e.target.value))
                            }
                        />
                        <ResetButton name="fastScrollSensitivity" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Mouse Wheel Zoom</h6>
                    <p className="settingsDescription">Zoom the editor font when using the mouse wheel while holding Ctrl.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.mouseWheelZoom}
                            onChange={(e) =>
                                updateSetting("mouseWheelZoom", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="mouseWheelZoom" />
                    </div>
                    <br />
                </div>
                <div className={`settingsCategoryContents easterEgg d-${advancedDisplay}`} id='advanced' onClick={toggleAdvanced}>
                    <h5>Advanced</h5>
                    <hr />

                    <h6 className="settingsItem">Match Brackets</h6>
                    <p className="settingsDescription">Controls the highlighting of matching brackets.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.matchBrackets}
                            onChange={(e) =>
                                updateSetting("matchBrackets", e.target.value)
                            }
                        >
                            <option value="always">Always</option>
                            <option value="near">Near</option>
                            <option value="never">Never</option>
                        </select>
                        <ResetButton name="matchBrackets" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Hover Enabled</h6>
                    <p className="settingsDescription">Enable hover tooltips in the editor.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.hover.enabled}
                            onChange={(e) =>
                                setSettings(prev => ({
                                    ...prev,
                                    hover: {
                                        ...prev.hover,
                                        enabled: e.target.value === "true"
                                    }
                                }))
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="hover.enabled" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Links</h6>
                    <p className="settingsDescription">Enable detection of links and make them clickable.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.links}
                            onChange={(e) =>
                                updateSetting("links", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="links" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Context Menu</h6>
                    <p className="settingsDescription">Enable the custom context menu in the editor.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.contextmenu}
                            onChange={(e) =>
                                updateSetting("contextmenu", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="contextmenu" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Read Only</h6>
                    <p className="settingsDescription">Make the editor read-only, preventing any modifications to the content.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.readOnly}
                            onChange={(e) =>
                                updateSetting("readOnly", e.target.value === "true")
                            }
                        >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                        </select>
                        <ResetButton name="readOnly" />
                    </div>
                    <br />

                    <h6 className="settingsItem">Accessibility Support</h6>
                    <p className="settingsDescription">Configure editor accessibility support. "Auto" detects screen readers, "On" forces it on, and "Off" forces it off.</p>
                    <div className="settingsInputWrapper">
                        <select
                            className="settingsInput"
                            value={settings.accessibilitySupport}
                            onChange={(e) =>
                                updateSetting("accessibilitySupport", e.target.value)
                            }
                        >
                            <option value="auto">Auto</option>
                            <option value="on">On</option>
                            <option value="off">Off</option>
                        </select>
                        <ResetButton name="accessibilitySupport" />
                    </div>
                    <br />
                </div>
            </div>

        </div>

    );

}