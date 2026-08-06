import { useState } from "react";

function Company({ company }) {
    return (
        <div>
            <p>{`Company Name: ${company.companyName}`}</p>
            <p>{`Company Position: ${company.companyPosition}`}</p>
            <p>{`Company Responsibilities: ${company.companyResponsibilities}`}</p>
        </div>
    )
}

function DisplayCompanies({ formData }) {

    //create an array of companies and their data
    const companies = [];
    for (const pair of formData) {
        const key = pair[0];
        const input = pair[1];

        //filter out non company related inputs
        if (key.startsWith("company")) {
            const id = key.slice(key.length - 1, key.length);
            if (!companies[id]) {
                companies[id] = { id: id };
            }

            const objectKey = key.slice(0, -2);
            companies[id][objectKey] = input;
        }
    }

    //create display of company
    return (
        companies.map((company) => {
            return (
                <Company key={company.id} company={company} />
            )
        })
    )
}

function Display({ formData }) {
    if (formData) {
        return (
            <div>
                <div>
                    <h2>General Information</h2>
                    <p>{`Name: ${formData.get("name")}`}</p>
                    <p>{`Email: ${formData.get("email")}`}</p>
                    <p>{`Phone Number: ${formData.get("phoneNum")}`}</p>
                </div>

                <div>
                    <h2>Education</h2>
                    <p>{`School Name: ${formData.get("school")}`}</p>
                    <p>{`Major: ${formData.get("major")}`}</p>
                    <p>{`GPA: ${formData.get("gpa")}`}</p>
                </div>

                <h2>Experience</h2>
                <DisplayCompanies formData={formData} />
            </div>
        )
    }
}

export default Display