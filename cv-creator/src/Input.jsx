import { useState } from 'react';

function Company({ id }) {
    return (
        <div>
            <label htmlFor={`companyName ${id}`}>Company Name</label>
            <input type="text" name={`companyName ${ id }`} id={`companyName ${ id }`} />

            <label htmlFor={`companyPosition ${ id }`}>Position</label>
            <input type="text" name={`companyPosition ${ id }`} id={`companyPosition ${ id }`} />

            <label htmlFor={`companyResponsibilities ${ id }`}>Responsibilities</label>
            <input type="text" name={`companyResponsibilities ${ id }`} id={`companyResponsibilities ${ id }`} />
        </div>
    )
}

function DisplayCompanies({ids}) {
    return (
        ids.map((id) => {
            return <Company key={id} id={id} />;
        })
    )
}


function Input() {
    const [companyIds, setIds] = useState([0]);

    function addId() {
        const newIds = companyIds.concat([companyIds.length]);
        setIds(newIds);
    }

    return (
        <>
            <h2>General Information</h2>

            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />

            <label htmlFor="phoneNum">Phone Number</label>
            <input type="number" name="phoneNum" id="phoneNum" />

            <h2>Education</h2>

            <label htmlFor="school">School Name</label>
            <input type="text" name="school" id="school" />

            <label htmlFor="major">Major</label>
            <input type="text" name="major" id="major" />

            <label htmlFor="gpa">GPA</label>
            <input type="number" name="gpa" id="gpa" />

            <h2>Experience</h2>
            <button type="button" onClick={addId}>Add Company</button>

            <DisplayCompanies ids={companyIds}/>
        </>
    )
};

export default Input