import React from 'react';

// material-ui
import { makeStyles, TextField, ThemeProvider, createTheme, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

// images
import logoWhite from '../../assets/images/LogoAllanProjects-White.svg';

// components
import TitleContent from '../../components/TitleContent';
import Curriculum from '../../components/Currriculum';

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
        width:"45%",
    },
    blocoCurriculo:{
        display:'flex',
        flexDirection:'column',
        width:'50%',
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
        width:'70%',
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
                    <div className={styles.primaryRow}>
                        <div className={styles.blocoEntrada}>
                            <div className={styles.dadosPessoais}>
                                <TitleContent txt="Dados pessoais"/>
                                <div className={styles.inputs}>
                                    <TextField label="Nome completo" variant="outlined" size="small" className={styles.input} required/>

                                    <TextField label="Endereço" variant="outlined" size="small" className={styles.input} required/>

                                    <TextField label="Telefone" variant="outlined" size="small" className={styles.input} required/>

                                    <TextField label="E-mail" variant="outlined" size="small" className={styles.input}/>

                                    <TextField label="Linkedin" variant="outlined" size="small" className={styles.input}/>
                                    
                                    <TextField label="Facebook" variant="outlined" size="small" className={styles.input}/>
                                    
                                    <TextField label="Twitter" variant="outlined" size="small" className={styles.input}/>
                                    
                                    <TextField label="Instagram" variant="outlined" size="small" className={styles.input}/>
                                    
                                    <TextField label="Github" variant="outlined" size="small" className={styles.input}/>
                                    
                                    <TextField label="Outro" variant="outlined" size="small" className={styles.input}/>

                                    <Button variant="contained" color="primary" className={styles.button}>
                                        Adicionar dados pessoais
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.topicoInformacoes}>
                                <TitleContent txt="Adicionar tópico de informações"/>
                                <div className={styles.bodyAddInformacoes}>
                                    <TextField label="Título" variant="outlined" size="small" className={styles.input} required/>
                                    <div className={styles.addParagraph}>
                                        <TextField label="Novo parágrafo" variant="outlined" size="small" required multiline rows={6} className={styles.inputParagraph}/>
                                        <div className={styles.bttsAddParagraph}>
                                            <Button variant="contained" color="primary" className={styles.button}>
                                                Adicionar parágrafo
                                            </Button>
                                            <Button variant="contained" color="primary" className={styles.button}>
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
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="Cor personalizada"
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
                            </div>
                            <Curriculum/>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Main;