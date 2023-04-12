import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
    // get access to the state, check whether we are homepage or in Customizer
    const snap = useSnapshot(state);

    const [file, setFile] = useState('');

    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })

    // show tab content depending on the activeTab
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "aipicker":
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />
            default:
                return null;
        }
    }

    return (
        <AnimatePresence>
            {/* If currently at intro page render home */}
            {!snap.intro && (
                <>
                    {/* Left Customization Tags */}
                    <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() =>     setActiveEditorTab(tab.name)} />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    {/* Back Button */}
                    <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                        <CustomButton type='filled' title='Go Back' handleClick={() => state.intro = true} customStyles='px-4 py-2.5 font-bold text-sm' />

                    </motion.div>

                    {/* Toggle Features */}
                    <motion.div
                        className='filtertabs-container'
                        {...slideAnimation("up")}
                    >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab=""
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
      
    )
};

export default Customizer;