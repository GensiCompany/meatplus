import {Breadcrumb} from "antd";

const HeaderPage = ({title, breadScrum,action})=>{
    return <div className='w-full'>
        <p className='text-[24px] font-[600] mb-[4px]'>{title}</p>
        <div className='flex justify-between'>
            <Breadcrumb items={breadScrum}></Breadcrumb>
            {action}
        </div>
    </div>
}

export default HeaderPage;