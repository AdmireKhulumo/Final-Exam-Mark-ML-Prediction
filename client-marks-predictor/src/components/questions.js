import React, { useState } from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
    TextField,
    Slider,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	radio: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	radioSet: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
}));

export default function Questions({setQuery, getPrediction}) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [age, setAge] = useState(15);
    const [failures, setFailures] = useState(0)
    const [study, setStudy] = useState(1);
    const [G1, setG1] = useState(0);
    const [G2, setG2] = useState(0);
    
    //for error dialogue box
	const handleClose = () => {
		setOpen(false);
	};

	const submitDetails = (e) => {
		e.preventDefault();
        const { sex, romantic, goout, Walc, Dalc} = e.target.elements;
        

		if (
			!sex.value ||
			!romantic.value ||
			!goout.value ||
			!Walc.value ||
			!Dalc.value
		) {
			setError("Please Fill In All Fields!");
			setOpen(true);
			return "";
        }
        else{
            const query = {
                age: age,
                sex: Number(sex.value),
                romantic: Number(romantic.value),
                goout: Number(goout.value),
                Walc: Number(Walc.value),
                Dalc: Number(Dalc.value),
                failures: failures,
                studytime: 10-study ,
                G1: G1/5,
                G2: G2/5,
            };
            console.log(query);
            getPrediction(query);
        }

        

    };
    
    const marks = [
        {value: 0,label: '0%',},
        //{value: 25,label: '25%'},
        {value: 50,label: '50%'},
        //{value: 75,label: '75%'},
        {value: 100,label: '100%'}
    ];

    const retakes = [
        {value:0, label:'0'},
        {value:1, label:'1'},
        {value:2, label:'2'},
        {value:3, label:'3'},
    ]

    const ages = [
        {value:15, label:'15'},
        {value:22, label:'22'},
    ]

    const hours = [
        {value:1, label:'1h'},
        {value:5, label:'5h'},
        {value:10, label:'10h'},
    ]
      
    const changeAge = (e, newValue)=>{
        setAge(newValue);
    };

    const changeFailures = (e, newValue)=>{
        setFailures(newValue);
    };

    const changeG1 = (e, newValue)=>{
        setG1(newValue);
    };

    const changeG2 = (e, newValue)=>{
        setG2(newValue);
    };

    const changeStudy = (e, newValue)=>{
        setStudy(newValue);
    };


	return (
		<div style={{maxWidth:'600px'}}>
			{success === false && (
				<form className={classes.form} noValidate onSubmit={submitDetails}>
					<Grid container spacing={2}>
                    <h3>Personal Questions</h3>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>1. How Old Are You?</strong></FormLabel>
                            <Slider
                                defaultValue={15}
                                onChange={changeAge}
                                id='age'
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks={ages}
                                min={15}
                                max={22}
                            />
						</Grid>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>2. Pick Your Gender:</strong> </FormLabel>
                            <RadioGroup
								aria-label="sex"
								name="sex"
								id="sex"
								className={classes.radio}
							>
                                <FormControlLabel 
                                    value="1" 
                                    control={<Radio />} 
                                    label="Male" 
                                />
								<FormControlLabel
									value="0"
									control={<Radio />}
									label="Female"
								/>
							</RadioGroup>
						</Grid>
						
                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>3. Are You In A Romantic Relationship?</strong> </FormLabel>
							<RadioGroup
								aria-label="romantic"
								name="romantic"
								id="romantic"
								className={classes.radio}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									label="YES"
								/>
								<FormControlLabel
									value="0"
									control={<Radio />}
									label="NO"
								/>
							</RadioGroup>
						</Grid>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>4. How Often Do You Go Out With Friends?</strong> (frequency)</FormLabel>
							<RadioGroup
								aria-label="goout"
								name="goout"
								id="goout"
								className={classes.radio}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									label="Very Low"
								/>
								<FormControlLabel
									value="2"
									control={<Radio />}
									label="Low"
								/>
                                <FormControlLabel
									value="3"
									control={<Radio />}
									label="Moderate"
								/>
                                <FormControlLabel
									value="4"
									control={<Radio />}
									label="High"
								/>
                                <FormControlLabel
									value="5"
									control={<Radio />}
									label="Very High"
								/>
							</RadioGroup>
						</Grid>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>5. How Much Alcohol Do You Drink During WEEKDAYS?</strong> (frequency)</FormLabel>
							<RadioGroup
								aria-label="Walc"
								name="Walc"
								id="Walc"
								className={classes.radio}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									label="Very Low"
								/>
								<FormControlLabel
									value="2"
									control={<Radio />}
									label="Low"
								/>
                                <FormControlLabel
									value="3"
									control={<Radio />}
									label="Moderate"
								/>
                                <FormControlLabel
									value="4"
									control={<Radio />}
									label="High"
								/>
                                <FormControlLabel
									value="5"
									control={<Radio />}
									label="Very High"
								/>
							</RadioGroup>
						</Grid>
  
                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>6. How Much Alcohol Do You Drink During WEEKENDS?</strong> (frequency)</FormLabel>
							<RadioGroup
								aria-label="Dalc"
								name="Dalc"
								id="Dalc"
								className={classes.radio}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									label="Very Low"
								/>
								<FormControlLabel
									value="2"
									control={<Radio />}
									label="Low"
								/>
                                <FormControlLabel
									value="3"
									control={<Radio />}
									label="Moderate"
								/>
                                <FormControlLabel
									value="4"
									control={<Radio />}
									label="High"
								/>
                                <FormControlLabel
									value="5"
									control={<Radio />}
									label="Very High"
								/>
							</RadioGroup>
						</Grid>
  
                        <h3>Academic Questions</h3>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>7. How Many Retakes Do You Have?</strong></FormLabel>
                            <Slider
                                defaultValue={0}
                                id='failures'
                                valueLabelDisplay="on"
                                // getAriaValueText={value}
                                onChange={changeFailures}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks={retakes}
                                min={0}
                                max={3}
                            />
						</Grid>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>8. Many Hours Do You Study Per Week?</strong></FormLabel>
                            <Slider
                                defaultValue={1}
                                id='studytime'
                                // getAriaValueText={value}
                                onChange={changeStudy}
                                valueLabelDisplay="on"
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto" 
                                step={1}
                                marks={hours}
                                min={1}
                                max={10}
                            />
						</Grid>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>9. Test 1 Mark:</strong> <i>...estimate if unknown</i> </FormLabel>
                            <Slider
                                defaultValue={0} 
                                id='G1'
                                // getAriaValueText={value}
                                onChange={changeG1}
                                valueLabelDisplay="on"
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks={marks}
                                min={0}
                                max={100}
                            />
						</Grid>

                        <Grid item xs={12}>
							<FormLabel component="legend"><strong>10. Test 2 Mark:</strong> <i>...estimate if unknown</i> </FormLabel>
                            <Slider
                                defaultValue={0}
                                id='G2'
                                // getAriaValueText={value}
                                onChange={changeG2}
                                valueLabelDisplay="on"
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks={marks}
                                min={0}
                                max={100}
                            />
						</Grid>

					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						<strong>PREDICT FINAL MARK!</strong>
					</Button>
				</form>
			)}


			{/*--------Dialogue For Input Error Display-------*/}
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{error}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary" autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}