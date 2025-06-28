import React from 'react';

const ShareButton = ({text}) => {
    return <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-500 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 text-white font-semibold text-lg tracking-wide rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-sm border border-white/10">
 {text}
</button>

};

export default ShareButton;