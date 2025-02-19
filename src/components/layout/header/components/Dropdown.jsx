import classes from "../style/Dropdown.module.css"
const Dropdown = ({children})=>{
    return <div className={'border-[2px] border-[#ddd] py-[15px] opacity-0 text-[#777] dropdown invisible absolute top-[50px] z-10 left-0 bg-white'} style={{boxShadow:'1px 1px 15px rgba(0, 0, 0, .15)'}}>
        <div className={classes.arrowUp}></div>
        {children}
    </div>
}

export default Dropdown;