import React, { useContext } from 'react';
import { Wrapper, Span, Pre, PageWrap, LineNo, FirstLineNo } from './style';
import { ThemeContext } from 'styled-components';

const Editor = (props) => {  
    const theme = useContext(ThemeContext);        
    const tab = props.path;
    const fTabName = tab.charAt(0).toUpperCase();
    const rTabName = tab.slice(1);
    const content = props.data && props.data[tab];       
    const head = `import ${fTabName}${rTabName} from '${fTabName}${rTabName}'`;
    
    let count = 0, color = '';
    
    const header = head.split(' ').map((str, index) => {
        return (
            <Span 
                initial={{ y: -50 }}
                animate={{y: 0}}
                transition={{ duration: .3 }}  
                key={str} color={theme.headerColor[`color${index}`]}>
                {str} 
                </Span>
            )
    });

    const detail = content.split("\n").map((str, index) => {
            count = 0;
            color = (str.includes("def") || str.includes("return")) ?  theme.contentColor[`color${1}`]:  theme.contentColor[`color${3}`];
            // color = (str.includes("def") && theme.contentColor[`color${1}`] || str.includes("return")) &&  theme.contentColor[`color${1}`] || theme.contentColor[`color${3}`];
            count++;
        
  
        let renderPre = (
            <Pre 
                initial={{ x: 10 }}
                animate={{x: 0}}
                whileHover={{ x: 5 }} 
                transition={{ duration: .2 }} 
                key={`${str + index}-detail`} 
                color={color}
            >{str}</Pre>
        );

        if (str.includes('href=')) {
            renderPre = (
                <Pre 
                    initial={{ x: 10 }}
                    animate={{x: 0}}
                    whileHover={{ x: 5 }} 
                    transition={{ duration: .2 }} 
                    key={`${str + index}-detail`} 
                    color={color}
                    dangerouslySetInnerHTML={{__html: str}}></Pre>
            )
        } 

        // if (str.includes('return')) {
        //     renderPre = (
        //         <Pre 
        //             initial={{ x: 10 }}
        //             animate={{x: 0}}
        //             whileHover={{ x: 5 }} 
        //             transition={{ duration: .2 }} 
        //             key={`${str + index}-detail`} 
        //             color={`blue`}
        //             dangerouslySetInnerHTML={{__html: str}}></Pre>
        //     )
        // } 

        return (
            <PageWrap key={index}>
                <LineNo >{index + 1}</LineNo>
                {renderPre}
            </PageWrap>
        )
    });
    
    return (
        <Wrapper>
            {/* <FirstLineNo>1</FirstLineNo> */}
            {/* {header} */}
            
            {detail}
        </Wrapper>
    )
}

export default Editor;