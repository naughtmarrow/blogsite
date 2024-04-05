import Tag from "./Tag";

function Thumbnail() {
    return (
        <div className="thumbnail">
            <div className="title-bar">
                <h2 className="title">Title</h2>
                <div className="tag-list">
                    <Tag
                        tagname={"react"}
                        background={"tag-iron"}
                        icon_color={"svg-light"}
                        text_color={"text-light"}
                    ></Tag>
                    <Tag
                        tagname={"tailwind"}
                        background={"tag-blue"}
                        icon_color={"svg-dark"}
                        text_color={"text-dark"}
                    ></Tag>
                </div>
            </div>
            <div className="separator"></div>
            <p className="date">2024-04-02</p>
            <p className="description">
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
                cillum sint consectetur cupidatat.
            </p>
        </div>
    );
}

// TODO: MAKE THE TAG LIST DYNAMIC
// TODO: CONFIGURE THE TAG LIST TO TAKE THE TAG INFO FROM THE SERVER

export default Thumbnail;
