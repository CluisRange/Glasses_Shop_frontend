import { FC } from 'react'
import { Oval } from 'react-loader-spinner'

interface Props {
    visible: boolean
}

const Loader: FC<Props> = ({visible}) => {
    return (
        <div className='w-100 h-100 position-fixed' style={{zIndex: 1, backgroundColor: '#99999988', transition: '0.2s all', display: !visible ? 'none' : ''}}>
            <div className='w-100 h-100 position-fixed d-flex justify-content-center align-items-center' >
                <Oval color='red' secondaryColor='gray' width={200} height={200} visible={true}></Oval>
            </div>
        </div>
    )
}

export default Loader