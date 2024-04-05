import { useState, useEffect } from "react";

function Tag({ tagname, background, icon_color, text_color }) {
    const [tagIcon, setTagIcon] = useState(null);

    useEffect(() => {
        const importSvg = async () => {
            try {
                const { default: svgUrl } = await import(`../assets/${tagname}.svg`);
                setTagIcon(svgUrl);
            } catch (err) {
                console.error(err);
            }
        };
        importSvg();
    }, [tagname]);

    return (
        <div className={`tag ${background}`}>
            <img src={tagIcon} className={`icon ${icon_color}`} />
            <h3 className={`tagname ${text_color}`}>{tagname.toUpperCase()}</h3>
        </div>
    );
}

// TODO: change the svg paths so that svgs can be loaded from server
// TODO: change the way in which tags color and background is done so that we can also get those from the server (maybe, idk)
// TODO: write down colors somewhere so that we can have a list for backend

export default Tag;
