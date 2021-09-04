import React, { useState, useRef } from 'react';
import {mask} from 'remask';

// material-ui
import { makeStyles, TextField, ThemeProvider, createTheme, Button, Select, MenuItem, FormControl, InputLabel, Switch } from '@material-ui/core';

// images
import logoWhite from '../../assets/images/LogoAllanProjects-White.svg';

// components
import TitleContent from '../../components/TitleContent';
import Curriculum from '../../components/Currriculum';
import Notification from '../../components/Notification';

// react-icons
import {AiFillPrinter} from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';

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
    listStyle:{
        paddingBottom:'1rem',
        fontStyle:'italic',
        display:'flex',
        alignItems:'center',
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

    // métodos usados para imprimir o currículo
    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });

    const styles = useStyles();

    const initialObjPeopleData = {
        nome: '',
        endereco: '',
        telefone: '',
        email:'',
        linkedin:'',
        facebook:'',
        twitter:'',
        instagram:'',
        github:'',
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

    const [blocks, setBlocks] = useState([]);

    const initialBlockInfo = {
        title:"",
        paragraphs:[],
        list:false,
    }
    const [newBlockInfo, setNewBlockInfo] = useState(initialBlockInfo);

    const [newParagraph, setNewParagraph] = useState('');
    
    function alterBlockInfo(e){

        const {name, value} = e.target;

        if(name === "title"){
            if(newBlockInfo.paragraphs.length > 0){
                setAlertNotf({
                    type:'warning',
                    msg:'Finalize o tópico de informações abaixo antes de modificar o título.'
                });
                setTimeout(function(){
                    setAlertNotf({
                        type:'',
                        msg:'',
                    })
                },3500);
            }
            else{
                setNewBlockInfo({...newBlockInfo, [name]:value});
            }
        }
        else if(name === "paragraph"){
            setNewParagraph(value);
        }
        else if(name === "itemList"){
            setNewItemList(value);
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

                let blockExist = blocks.filter((block) => block.title === newBlockInfo.title);

                // SIGNIFICA QUE O BLOCO AINDA NÃO FOI ADICIONADO NO CURRICULO
                if(blockExist.length === 0){
                    
                    // E ENTÃO ADICIONA
                    setBlocks([...blocks, newBlockInfo]);

                }

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

                enterPress("bttAdd")
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

    function endTopic(){
        if(newBlockInfo.title !== '' && newBlockInfo.paragraphs.length > 0){

            setNewBlockInfo(initialBlockInfo);
            setListStyle(false);

            setAlertNotf({
                type:'success',
                msg:'Bloco adicionado com sucesso, você já pode inserir outro agora!',
            });
            setTimeout(function(){
                setAlertNotf({
                    type:'',
                    msg:'',
                })
            },3500);

            enterPress("endTopic")
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

    const [listStyle, setListStyle] = useState(false);
    function alterListStyle(){
        setListStyle(!listStyle);
        setNewParagraph('');
        setNewItemList('');
        setNewBlockInfo({...newBlockInfo, list:!listStyle});
    }

    const [newItemList, setNewItemList] = useState('');
    
    function addItemList(){
        if(newItemList.length < 4){
            setAlertNotf({
                type:'info',
                msg:'O item da lista deve possuir ao menos 4 caracteres.'
            });
            setTimeout(function(){
                setAlertNotf({
                    type:'',
                    msg:'',
                })
            },3500);
        }
        else{
            // VERIFICANDO SE O NOVO ITEM JÁ FOI ADICIONADO NO BLOCO DE INFORMAÇÕES
            if(!newBlockInfo.paragraphs.includes(newItemList)){

                // ADICIONA O NOVO ITEM NO ARRAY "PARAGRAPHS" QUE VAI DIFERENCIAR SE É LISTA OU PARÁGRAFO PELO ATRIBUTO "LIST" DO BLOCO
                newBlockInfo.paragraphs.push(newItemList);

                let blockExist = blocks.filter((block) => block.title === newBlockInfo.title);

                // SIGNIFICA QUE O BLOCO AINDA NÃO FOI ADICIONADO NO CURRICULO
                if(blockExist.length === 0){

                    // E ENTÃO ADICIONA
                    setBlocks([...blocks, newBlockInfo]);

                }

                // ZERA O CAMPO PARA ADICIONAR ITEM
                setNewItemList('');

                setAlertNotf({
                    type:'success',
                    msg:'Item adicionado no bloco com sucesso!',
                });
                setTimeout(function(){
                    setAlertNotf({
                        type:'',
                        msg:'',
                    })
                },3500);

                enterPress("bttAdd")
            }
            else{
                setAlertNotf({
                    type:'warning',
                    msg:'Você já inseriu esse item no bloco de informações!'
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

    function removeBlock(title){

        let newBlocks = blocks.filter(block => block.title !== title);

        setBlocks(newBlocks);

        setAlertNotf({
            type:'success',
            msg:`Bloco de informações "${title}" removido com sucesso!`,
        });
        setTimeout(function(){
            setAlertNotf({
                type:'',
                msg:'',
            })
        },3500);

    }

    function enterPress(from){
        if((from === "title" && newBlockInfo.title.length > 0) || from === "bttAdd"){
            if(listStyle){

                let shieldItemList = document.getElementsByName("itemList")[0];

                if(shieldItemList){
                    setTimeout(function(){
                        shieldItemList.focus();
                    },100);
                }

            }
            else{
                
                let shieldParagraph = document.getElementsByName("paragraph")[0];

                if(shieldParagraph){
                    setTimeout(function(){
                        shieldParagraph.focus();
                    },100);
                }

            }
        }
        else if(from === "endTopic"){
            let shieldTitle = document.getElementsByName("title")[0];

            if(shieldTitle){
                setTimeout(function(){
                    shieldTitle.focus();
                },100);
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

                                </div>
                            </div>
                            <div className={styles.topicoInformacoes}>
                                <TitleContent txt="Adicionar tópico de informações"/>
                                <div className={styles.bodyAddInformacoes}>
                                    <div className={styles.listStyle}>
                                        <Switch
                                            checked={listStyle}
                                            onChange={alterListStyle}
                                            onKeyDown={(e)=> e.key === "Enter" ? alterListStyle() : null}
                                            color="primary"
                                        />
                                        <span>
                                            Bloco em formato de lista
                                        </span>
                                    </div>
                                    <TextField label="Título" variant="outlined" size="small" className={styles.input} required name="title" value={newBlockInfo.title} onChange={alterBlockInfo} onKeyDown={(e)=> e.key === "Enter" ? enterPress('title') : null}/>
                                    <div className={styles.addParagraph}>

                                        {
                                            listStyle ?
                                            <TextField 
                                            label="Novo item da lista"
                                            variant="outlined"
                                            size="small"
                                            required
                                            className={styles.inputParagraph}
                                            name="itemList"
                                            value={newItemList}
                                            onChange={alterBlockInfo}
                                            />
                                            :
                                            <TextField label="Novo parágrafo" variant="outlined" size="small" required multiline rows={6} className={styles.inputParagraph} name="paragraph" value={newParagraph} onChange={alterBlockInfo}/>
                                        }

                                        <div className={styles.bttsAddParagraph}>
                                            <Button variant="contained" color="primary" className={styles.button} onClick={listStyle ? addItemList : addParagraph}>
                                                {
                                                    listStyle ?
                                                    "Adicionar item"
                                                    :
                                                    "Adicionar parágrafo"
                                                }   
                                            </Button>
                                            {
                                                listStyle?
                                                null
                                                :
                                                <Button variant="contained" color="primary" className={styles.button} onClick={endTopic} disabled={newBlockInfo.paragraphs.length === 0 ? true : false}>
                                                    Finalizar tópico de informações
                                                </Button>
                                            }
                                        </div>
                                    </div>
                                    {
                                        listStyle ?
                                        <Button variant="contained" color="primary" className={styles.button} style={{width:'100%'}} onClick={endTopic} disabled={newBlockInfo.paragraphs.length === 0 ? true : false}>
                                            Finalizar tópico de informações
                                        </Button>
                                        :
                                        null
                                    }
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
                                
                                <Button variant="contained" color="primary" className={styles.button} endIcon={<AiFillPrinter/>} onClick={handlePrint}>
                                    Imprimir
                                </Button>

                            </div>
                            <Curriculum objPeopleData={objPeopleData} blocks={blocks} ref={ref} remove={removeBlock}/>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Main;