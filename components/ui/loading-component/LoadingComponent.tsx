import Image from 'next/image';

export const LoadingComponent = () => {
    
    return (
        /*  height: 100%;
            width: 100%;
            position: absolute;
            top: 40%;
            left: 50%;*/
        //<div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Image
                height={ 65 }
                width={ 65 }
                className=""
                src="/Global.gif"
                alt="First slide"
                style={{objectFit: "contain"}}
            />
        //</div>
    )
        
}
