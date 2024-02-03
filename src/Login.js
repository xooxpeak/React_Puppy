import { useEffect } from "react";
import { useParams } from "react-router-dom";

let Login = () => {

    let param = useParams();
    useEffect(()=>{
        console.log(param);    
    },[]);

 //   let {id} = useParams();
 //   useEffect(()=>{
 //       console.log(id);    
 //   },[]);


    return(
        <div>
            로그인 페이지
        </div>
    );
}

export default Login;