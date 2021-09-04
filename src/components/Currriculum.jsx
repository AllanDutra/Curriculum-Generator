import React from 'react';

// react-icons
import {MdSmartphone} from 'react-icons/md';
import {FiMail} from 'react-icons/fi';
import {FaLinkedin} from 'react-icons/fa';
import {AiFillFacebook, AiOutlineTwitter, AiFillGithub} from 'react-icons/ai';
import {SiInstagram} from 'react-icons/si';
import {RiDeleteBin5Fill} from 'react-icons/ri';

// material-ui
import { IconButton, makeStyles } from '@material-ui/core';

// styles
import '../styles/index.css';
import '../styles/curriculum.css';

const useStyles = makeStyles({
    curriculum:{
        width:'100%',
        height:'38rem',
        overflowY:'auto',
        backgroundColor:'white',
        padding:'4rem',
        boxShadow:'0 0 0.5rem rgba(0,0,0,0.2)',
    },
    headerCurriculum:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:'1.2rem',
    },
    nome:{
        fontSize:'1.2em',
        fontWeight:'bold',
    },
    endereco:{
        color:"#8f8f87",
        fontSize:'0.7rem',
    },
    itensHeader:{
        color:"#8f8f87",
        fontSize:'0.7rem',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
    },
    itemHeader:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:"center",
        padding:'0.2rem 0.5rem 0.2rem 0.5rem',
    },
    titleBlock:{
        width:'100%',
        color:'black',
        borderBottom:'2px solid black',
        fontWeight:'bold',
        fontSize:'0.9rem',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },
    paragraphsBlock:{
        marginTop:'0.4rem',
        width:'100%',
        fontSize:'0.7rem',
        textAlign:'justify',
    },
    paragraph:{
        marginBottom:'0.2rem',
    },
});

const ItemHeader = (props) => {

    const styles = useStyles();

    return (
        <span className={styles.itemHeader}>
            <span style={{marginRight:'0.2rem'}}>{props.icon}</span>
            <span>{props.txt}</span>
        </span>
    )
};

const BlockInfo = (props) => {

    const styles = useStyles();

    return(
        <div className={styles.blockInfo} id="blockInfo">
            <div className={styles.titleBlock} id="titleBlock">
                {props.title}
                <span id="binIcon">
                    <IconButton style={{padding:"40%", display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>props.remove(props.title)}>
                        <RiDeleteBin5Fill size="0.9rem" color="#cc0000"/>
                    </IconButton>
                </span>
            </div>
            <div className={`list ${styles.paragraphsBlock}`} id="paragraphsBlock">

                {/* VERIFICANDO SE O USUÁRIO DEFINIU OU NÃO FORMATO DE LISTA */}
                {
                    props.list ?

                        // formato de lista
                        props.paragraphs ?

                            <ul>
                                {
                                    props.paragraphs.map((item, k)=>{
                                        return (
                                            <li key={k} id={k === props.paragraphs.length-1 ? "lastParagraph" : null}>
                                                <span>{item}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        
                        :

                        <h4>Você não definiu nenhum item para essa lista.</h4>

                    :
                        // formato de parágrafo
                        props.paragraphs ? 

                            props.paragraphs.map((paragraph, k)=>{
                                return(
                                    <p key={k} className={styles.paragraph} id={k === props.paragraphs.length-1 ? "lastParagraph" : null}>
                                        {paragraph}
                                    </p>
                                )
                            })

                    :
                        <h4>Você não definiu nenhum parágrafo para este bloco.</h4>
                }
            </div>
        </div>
    )
}

const Curriculum = React.forwardRef((props, ref) => {

    const styles = useStyles();

    return (
        <div className={`curriculum ${styles.curriculum}`} ref={ref} id="curriculum">
            {
                props.objPeopleData.nome !== '' ?
                <>
                    <div className={styles.headerCurriculum}>
                        <span className={styles.nome} id="nome">{props.objPeopleData.nome}</span>
                        <span className={styles.endereco} id="endereco">{props.objPeopleData.endereco}</span>
                        <div className={styles.itensHeader} id="itensHeader">
                            {props.objPeopleData.telefone ?
                                <ItemHeader icon={<MdSmartphone/>} txt={props.objPeopleData.telefone}/>
                                :
                                ""
                            }
                            {props.objPeopleData.email ?
                                <ItemHeader icon={<FiMail/>} txt={props.objPeopleData.email}/>
                                :
                                ""
                            }
                            {props.objPeopleData.linkedin ?
                                <ItemHeader icon={<FaLinkedin/>} txt={props.objPeopleData.linkedin}/>
                                :
                                ""
                            }
                            {props.objPeopleData.facebook ?
                                <ItemHeader icon={<AiFillFacebook/>} txt={props.objPeopleData.facebook}/>
                                :
                                ""
                            }
                            {props.objPeopleData.twitter ?
                                <ItemHeader icon={<AiOutlineTwitter/>} txt={props.objPeopleData.twitter}/>
                                :
                                ""
                            }
                            {props.objPeopleData.instagram ?
                                <ItemHeader icon={<SiInstagram/>} txt={props.objPeopleData.instagram}/>
                                :
                                ""
                            }
                            {props.objPeopleData.github ?
                                <ItemHeader icon={<AiFillGithub/>} txt={props.objPeopleData.github}/>
                                :
                                ""
                            }
                        </div>
                    </div>
                    <div className={styles.bodyCurriculum}>
                        {
                            props.blocks.length > 0 ? 
                            props.blocks.map((bloco, i)=>{
                                return (
                                    <span key={i}>
                                        <BlockInfo title={bloco.title} paragraphs={bloco.paragraphs} list={bloco.list} remove={props.remove}/>
                                    </span>
                                )
                            })
                            :
                            <h4 style={{color:'#c4c4c4', textAlign:'center'}}><em>Adicione blocos de informações para aparecerem aqui...</em></h4>
                        }
                    </div>
                </>
                :
                <h4 style={{color:'#c4c4c4', textAlign:'center'}}><em>Preencha os campos e clique em adicionar para suas informações aparecerem aqui</em></h4>
            }
        </div>
    )
});

export default Curriculum;