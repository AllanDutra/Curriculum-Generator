import React, { useState } from 'react';
import {mask} from 'remask';

// material-ui
import { makeStyles, TextField, ThemeProvider, createTheme, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

// images
import logoWhite from '../../assets/images/LogoAllanProjects-White.svg';

// components
import TitleContent from '../../components/TitleContent';
import Curriculum from '../../components/Currriculum';
import Notification from '../../components/Notification';

// react-icons
import {AiFillPrinter} from 'react-icons/ai';

const useStyles = makeStyles({
    page:{

    },
    header:{
        backgroundColor:'black',
        color:'white',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        padding:"0.5rem 2rem 0.5rem 2rem",
        fontWeight:'bold',
    },
    logo:{
        width:'6.5rem',
    },
    body:{
        padding:'1rem 2rem 1rem 2rem',
    },
    primaryRow:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between',
        width:'100%',
    },
    blocoEntrada:{
        display:'flex',
        flexDirection:'column',
        width:"38rem",
    },
    blocoCurriculo:{
        display:'flex',
        flexDirection:'column',
        width:'38rem',
    },
    dadosPessoais:{
        width:'100%',
    },
    inputs:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between',
        paddingTop:'1rem',
    },
    input:{
        width:"15rem",
        marginBottom:'1rem',
    },
    button:{
        fontWeight:'bold',
        textTransform:"none",
        marginBottom:'1rem',
        "&:hover":{
            backgroundColor:'white',
            color:"black",
            border:'1px solid black',
        },
    },
    topicoInformacoes:{
        width:'100%',
    },
    bodyAddInformacoes:{
        paddingTop:'1rem',
    },
    addParagraph:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
    },
    inputParagraph:{
        width:'60%',
        marginBottom:'1rem',
    },
    bttsAddParagraph:{
        width:'35%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
    },
    optionsCurriculo:{
        display:'flex',
        justifyContent:'space-between',
    },
    select:{
        width:'50%',
    },
})

const theme = createTheme({
    palette:{   
        primary:{
            main: '#000000',
        },
    },
})

const Main = () => {

    const styles = useStyles();

    const initialObjPeopleData = {
        nome: 'Romeu Amaral Barreira',
        endereco: 'Rua Pará, 8955, Bairro Boa Vista - Parintins - Amazonas',
        telefone: '(64) 33263-9861',
        email:'yaimara266@uorak.com',
        linkedin:'',
        facebook:'',
        twitter:'',
        instagram:'',
        github:'',
        outro:'',
    }
    const [objPeopleData, setObjPeopleData] = useState(initialObjPeopleData);

    function alterPeopleData(ev){
        const {name, value} = ev.target;

        if(name === 'telefone'){
            let maskedFone = mask(value, ['(99) 9 9999-9999']);
            setObjPeopleData({...objPeopleData, [name]:maskedFone});
        }
        else{
            setObjPeopleData({...objPeopleData, [name]:value});
        }

    }

    const [colorCurriculum, setColorCurriculum] = useState('black');
    function alterColorCurriculum(ev){
        setColorCurriculum(ev.target.value);
    }

    const [alertNotf, setAlertNotf] = useState({
        type:'',
        msg:'',
    });

    function addPeopleData(){

        let countRequiredEmpty = 0;

        for(let i in objPeopleData){
            if(i === 'nome' || i === 'telefone' || i === 'endereco'){
                if(objPeopleData[i] === ''){
                    countRequiredEmpty++;
                }
            }
        }

        if(countRequiredEmpty !== 0){
            setAlertNotf({
                type:'warning',
                msg:'Existem campos que precisam ser inseridos para prosseguir!'
            });
            setTimeout(function(){
                setAlertNotf({
                    type:'',
                    msg:'',
                })
            },3500);
        }
        else{

        }
        
    }

    const [blocks, setBlocks] = useState([]);

    const initialBlockInfo = {
        title:"",
        paragraphs:[],
    }
    const [newBlockInfo, setNewBlockInfo] = useState(initialBlockInfo);

    const [newParagraph, setNewParagraph] = useState('');
    
    function alterBlockInfo(e){

        const {name, value} = e.target;

        if(name === "title"){
            setNewBlockInfo({...newBlockInfo, [name]:value});
        }
        else if(name === "paragraph"){
            setNewParagraph(value);
        }

    }

    function addParagraph(){
        if(newParagraph.length < 10){
            setAlertNotf({
                type:'info',
                msg:'Informe ao menos 10 caracteres no seu parágrafo para prosseguir!'
            });
            setTimeout(function(){
                setAlertNotf({
                    type:'',
                    msg:'',
                })
            },3500);
        }
        else{
            if(!newBlockInfo.paragraphs.includes(newParagraph)){
                newBlockInfo.paragraphs.push(newParagraph);
                setNewParagraph('');
                setAlertNotf({
                    type:'success',
                    msg:'Parágrafo adicionado com sucesso!',
                });
                setTimeout(function(){
                    setAlertNotf({
                        type:'',
                        msg:'',
                    })
                },3500);
            }
            else{
                setAlertNotf({
                    type:'warning',
                    msg:'Você já inseriu esse parágrafo no seu currículo!'
                });
                setTimeout(function(){
                    setAlertNotf({
                        type:'',
                        msg:'',
                    })
                },3500);
            }
        }
    }

    function addBlockInfo(){

        let blockExist = blocks.filter(block => block.title === newBlockInfo.title);

        if(blockExist.length > 0){
            setAlertNotf({
                type:'warning',
                msg:'Você já adicionou um bloco de informações com esse título!'
            });
            setTimeout(function(){
                setAlertNotf({
                    type:'',
                    msg:'',
                })
            },3500);
        }
        else{
            if(newBlockInfo.title !== '' && newBlockInfo.paragraphs.length > 0){
                setBlocks([...blocks, newBlockInfo]);
                setNewBlockInfo(initialBlockInfo);
            }
            else{
                setAlertNotf({
                    type:'error',
                    msg:'Verifique os campos do seu bloco de informações e tente novamente!'
                });
                setTimeout(function(){
                    setAlertNotf({
                        type:'',
                        msg:'',
                    })
                },3500);
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.page}>
                <div className={styles.header}>
                    <img src={logoWhite} alt="logo" className={styles.logo}/>
                    <span>
                        Sistema de geração de currículos
                    </span>
                </div>
                <div className={styles.body}>
                    <Notification type={alertNotf.type} msg={alertNotf.msg}/>
                    <div className={styles.primaryRow}>
                        <div className={styles.blocoEntrada}>
                            <div className={styles.dadosPessoais}>
                                <TitleContent txt="Dados pessoais"/>
                                <div className={styles.inputs}>
                                    <TextField label="Nome completo" variant="outlined" size="small" className={styles.input} required name="nome" value={objPeopleData.nome} onChange={alterPeopleData}/>

                                    <TextField label="Endereço" variant="outlined" size="small" className={styles.input} required name="endereco" value={objPeopleData.endereco} onChange={alterPeopleData}/>

                                    <TextField label="Telefone" variant="outlined" size="small" className={styles.input} required name="telefone" value={objPeopleData.telefone} onChange={alterPeopleData}/>

                                    <TextField label="E-mail" variant="outlined" size="small" className={styles.input} name="email" value={objPeopleData.email} onChange={alterPeopleData}/>

                                    <TextField label="Linkedin" variant="outlined" size="small" className={styles.input} name="linkedin" value={objPeopleData.linkedin} onChange={alterPeopleData}/>
                                    
                                    <TextField label="Facebook" variant="outlined" size="small" className={styles.input} name="facebook" value={objPeopleData.facebook} onChange={alterPeopleData}/>
                                    
                                    <TextField label="Twitter" variant="outlined" size="small" className={styles.input} name="twitter" value={objPeopleData.twitter} onChange={alterPeopleData}/>
                                    
                                    <TextField label="Instagram" variant="outlined" size="small" className={styles.input} name="instagram" value={objPeopleData.instagram} onChange={alterPeopleData}/>
                                    
                                    <TextField label="Github" variant="outlined" size="small" className={styles.input} name="github" value={objPeopleData.github} onChange={alterPeopleData}/>
                                    
                                    <TextField label="Outro" variant="outlined" size="small" className={styles.input} name="outro" value={objPeopleData.outro} onChange={alterPeopleData}/>

                                    <Button variant="contained" color="primary" className={styles.button} onClick={addPeopleData}>
                                        Adicionar dados pessoais
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.topicoInformacoes}>
                                <TitleContent txt="Adicionar tópico de informações"/>
                                <div className={styles.bodyAddInformacoes}>
                                    <TextField label="Título" variant="outlined" size="small" className={styles.input} required name="title" value={newBlockInfo.title} onChange={alterBlockInfo}/>
                                    <div className={styles.addParagraph}>
                                        <TextField label="Novo parágrafo" variant="outlined" size="small" required multiline rows={6} className={styles.inputParagraph} name="paragraph" value={newParagraph} onChange={alterBlockInfo}/>
                                        <div className={styles.bttsAddParagraph}>
                                            <Button variant="contained" color="primary" className={styles.button} onClick={addParagraph}>
                                                Adicionar parágrafo
                                            </Button>
                                            <Button variant="contained" color="primary" className={styles.button} onClick={addBlockInfo} disabled={newBlockInfo.paragraphs.length === 0 ? true : false}>
                                                Finalizar tópico de informações
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.blocoCurriculo}>
                            <div className={styles.optionsCurriculo}>
                                
                                <FormControl variant="outlined" className={styles.select} size="small">
                                    <InputLabel id="demo-simple-select-outlined-label">Cor personalizada</InputLabel>
                                    <Select
                                    label="Cor personalizada"
                                    value={colorCurriculum}
                                    onChange={alterColorCurriculum}
                                    >
                                        <MenuItem value="black">
                                            <em>Padrão</em>
                                        </MenuItem>
                                        <MenuItem value="red">Vermelha</MenuItem>
                                        <MenuItem value="blue">Azul</MenuItem>
                                        <MenuItem value="green">Verde</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                <Button variant="contained" color="primary" className={styles.button}>
                                    Voltar à cor padrão
                                </Button>
                                
                                <Button variant="contained" color="primary" className={styles.button} endIcon={<AiFillPrinter/>}>
                                    Imprimir
                                </Button>

                            </div>
                            <Curriculum objPeopleData={objPeopleData} blocks={blocks}/>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Main;