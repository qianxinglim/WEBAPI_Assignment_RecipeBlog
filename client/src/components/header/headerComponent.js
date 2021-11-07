import "./headerComponent.css"

export default function Header(){
    
    return (
        <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">Recipe</span>
            <span className="headerTitleLg">Blog</span>
        </div>
        <img
            className="headerImg"
            src="https://www.safefood.net/getmedia/3d7a1265-2038-4345-a676-d0d8a6d304d5/healthy-diet.jpg?w=2000&h=1335&ext=.jpg&width=1360&resizemode=force"
            alt=""
        />
        </div>
    );
}