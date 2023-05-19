import { useState, useEffect } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import "./SignUp.css";
import { useForm } from 'react-hook-form';
import { set_user } from './userSlice'


function SignUp() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // console.log(errors);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [password, setPassword] = useState('');

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        // console.log("*************subjects", subjects);
    }, [subjects])


    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleGendar = (e) => {
        setGender(e.target.value);
    };

    const schema = {
        question1: {
            required: 'This field is required',
        },
    };

    function deleteElement(arr, element) {
        const index = arr.indexOf(element);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    const handleSubject = (event) => {
        if (subjects.includes(event.target.value)) {
            let arr = [...subjects];
            let updatedArr = deleteElement(arr, event.target.value);
            setSubjects(updatedArr);
        } else {
            setSubjects([...subjects, event.target.value]);
        }
    };

    const handleAllSubject = (event) => {
        if (event.target.checked) {
            setSubjects(['english', 'physics', 'chemistry']);
        } else {
            setSubjects([]);
        }
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };


    // Handling the data
    const formHandle = (event) => {
        const myData = {
            name: event.name,
            email: event.email,
            gender: gender,
            subjects: subjects,
            selectedCity: selectedCity,
            selectedState: selectedState,
            password: event.password
        }
        // console.log(myData);

        dispatch(set_user(myData));

        alert("Successfully Submitted")
        reset();
        setSubjects([]);
        setSelectedState("");
        setSelectedCity("");
    };

    return (
        <div className="main">
            <Container>
                <div className='SignUpForm'>
                    <Form className='forms' onSubmit={handleSubmit(formHandle)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Full Name <span className='star'>*</span></Form.Label>
                            <Form.Control
                                onChange={handleName}
                                name='name'
                                type="text"
                                placeholder="Enter name"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "This field is required"
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "This name is too long , try again"
                                    }
                                })} />
                            <div className="errorMsg" >{errors.name ? <span>{errors.name.message}</span> : ""}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address <span className='star'>*</span></Form.Label>
                            <Form.Control
                                onChange={handleEmail}
                                name="email"
                                type="text"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "This field is required"
                                    },
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Invalid email address!"
                                    }
                                })} />
                            <div className="errorMsg" >{errors.email ? <span>{errors.email.message}</span> : ""}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Gender <span className='star'>*</span></Form.Label>
                            {['radio'].map((type) => (
                                <div key={`question1`}>
                                    <div key={`inline-${type}`} className="mb-3" onChange={handleGendar}>
                                        <Form.Check
                                            inline
                                            label="Male"
                                            name="group1"
                                            type={type}
                                            value="Male"
                                            id={`inline-${type}-1`}
                                            {...register("question1", {
                                                required: schema.question1.required,
                                            })}
                                        />
                                        <Form.Check
                                            inline
                                            label="Female"
                                            name="group1"
                                            type={type}
                                            value="Female"
                                            id={`inline-${type}-2`}
                                            {...register("question1", {
                                                required: schema.question1.required,
                                            })}
                                        />
                                        <div className="errorMsg" >{!!errors.question1} {errors.question1?.message}</div>
                                    </div>
                                </div>
                            ))}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Subject <span className='star'>*</span></Form.Label>
                            <div>
                                <input className='chck'
                                    type="checkbox"
                                    value="all"
                                    checked={subjects.length == 3}
                                    onChange={(event) => handleAllSubject(event)}
                                />
                                <label>All</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="nr1"
                                    value="english"
                                    checked={subjects.includes('english')}
                                    onChange={(event) => handleSubject(event)}
                                />
                                <label>English</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="nr2"
                                    value="physics"
                                    checked={subjects.includes('physics')}
                                    onChange={(event) => handleSubject(event)}
                                />
                                <label>Physics</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="nr3"
                                    value="chemistry"
                                    checked={subjects.includes('chemistry')}
                                    onChange={(event) => handleSubject(event)}
                                />
                                <label>Chemistry</label>
                            </div>
                            <div className="errorMsg" >{errors.myCheckbox && <span>This field is required</span>}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <label htmlFor="dropdown2">Select a State <span className='star'>*</span></label>
                            <select id="dropdown2" {...register("dropdown2", { required: true })} value={selectedState} onChange={handleStateChange}>
                                <option value="">Select a state</option>
                                <option value="MP">MP</option>
                                <option value="UP">UP</option>
                                <option value="Maharashtra">Maharashtra</option>
                            </select>
                            <div className="errorMsg" >{errors.dropdown2 && <span>This field is required</span>}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <label htmlFor="dropdown">Select a City <span className='star'>*</span></label>
                            <select id="dropdown" {...register("dropdown", { required: true })} value={selectedCity} onChange={handleCityChange}>
                                <option value="">Select a city</option>
                                {selectedState === 'MP' && (
                                    <>
                                        <option value="indore">Indore</option>
                                        <option value="ujjain">Ujjain</option>
                                    </>
                                )}
                                {selectedState === 'UP' && (
                                    <>
                                        <option value="lucknow">Lucknow</option>
                                        <option value="agra">Agra</option>
                                    </>
                                )}
                                {selectedState === 'Maharashtra' && (
                                    <>
                                        <option value="mumbai">Mumbai</option>
                                        <option value="pune">Pune</option>
                                    </>
                                )}
                            </select>
                            <div className="errorMsg" >{errors.dropdown && <span>This field is required</span>}</div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password <span className='star'>*</span></Form.Label>
                            <Form.Control
                                onChange={handlePassword}
                                // value={password}
                                name='password'
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password must contain 8 characters"
                                    }
                                })} />
                            <div className="errorMsg" >{errors.password ? <span>{errors.password.message}</span> : ""}</div>
                        </Form.Group>

                        <Button
                            onChange={() => { handleSubmit(); }}
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
export default SignUp;