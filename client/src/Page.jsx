import React, {useState } from 'react'
import Input from './Input'
import Button from './Button'
// import Greeting from './Greeting'
import './App.css'
import Header from './Header'
import Radio from './Radio'
//import { render } from '@testing-library/react'



const Page = (props) => {


    const [contact, setContact] = useState({
        task: '',
        title: '',
        description: '',
        date: '',
        suburb: '',
        budget: '',
        estimate: '',
        datafile: '',
    })

    const [isPerson, setIsPerson] = useState(true)



    const handleChange = (event) => {
        const { name, value } = event.target
        setContact((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        });
    }


    const TypeChange = (e) => {
        if (e.target.value === "person") {
            setIsPerson(true)
            setContact((preValue) => {
                return {
                    ...preValue,
                    task: "person"
                }
            })
        }
        else {
            setIsPerson(false)
            setContact((preValue) => {
                return {
                    ...preValue,
                    task: "online"
                }
            })
        }
    }


    const handleRegister = () => {
        fetch('http://localhost:5000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: contact.task,
                title: contact.title,
                description: contact.description,
                date: contact.date,
                suburb: contact.suburb,
                estimate: contact.estimate,
                budget: contact.budget,
                datafile: contact.datafile,
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log("Error:" + err)
            })
    }


    return <div class="form-group">

        <div>
            <Header
                text="New Task"
            />
        </div>



        <div class = "content">
            <p class = "content">Select task type</p>
            <Radio
                name='task'
                type='radio'
                value='person'
                placeholder='In person'
                onChange={TypeChange}
            // value = {contact.task}
            />
            <Radio
                name='task'
                type='radio'
                value='online'
                placeholder='Online'
                onChange={TypeChange}
            // value = {contact.task}
            />
        </div>

        <br></br>


        <div>
            <Header
                text="Describe your tasks to Experts"
            />
        </div>
        <div class = "content">
            <p>Task title</p>
            <Input
                text="tiele"
                name='title'
                type='text'
                placeholder='Enter Task Title'
                onChange={handleChange}
                value={contact.title}
            />

            <br></br>
            <p>Description</p>
            <Input
                name='description'
                type='suburb'
                placeholder='description'
                onChange={handleChange}
                value={contact.description}
            />
        </div>
        <div>
            <Header
                text="Setting up your task"
            />

        </div>

        {!isPerson ?

            <div class = "content">
                <p>Date</p>
                <Input
                    name='date'
                    type='text'
                    placeholder='Enter a date'
                    onChange={handleChange}
                    value={contact.date}
                />
            </div>
            :
            <div class = "content">
                <div>
                    <p>Date</p>
                    <Input
                        name='date'
                        type='text'
                        placeholder='Enter a date'
                        onChange={handleChange}
                        value={contact.date}
                    />
                </div>

                <br></br>
                <div>
                <p>Suburb</p>
                    <Input
                        name='suburb'
                        type='text'
                        placeholder='Enter a suburb'
                        onChange={handleChange}
                        value={contact.suburb}
                    />
                </div>
            </div>
        }



        <div>
            <Header
                text="Suggest how much"
            /></div>

        <div class = "content">
            <p>What is your budget?:</p>
            <p>(This is an estimate)</p>
            <Radio
                name='budget'
                type='radio'
                value='Total'
                placeholder='Total'
                onChange={handleChange}
            // value = {contact.task}
            />
            <Radio
                name='budget'
                type='radio'
                value='Hourly Rate'
                placeholder='Hourly Rate'
                onChange={handleChange}
            // value = {contact.task}
            />
        </div>


        <div class = "content">
        <Input
            name='estimate'
            type='text'
            placeholder='$'
            onChange={handleChange}
            value={contact.estimate}
        />
        <Button
            type='submit'
            text='Post Task'
            onClick={handleRegister}
        />
        </div>

    </div>

}




export default Page
