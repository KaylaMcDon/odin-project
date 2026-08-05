import { useState } from 'react';

function Company({ id }) {
    return (
        <div>
            <label htmlFor={`compName ${id}`}>Company Name</label>
            <input type="text" name={`compName ${ id }`} id={`compName " + { id }`} />

            <label htmlFor={`position ${ id }id }`}>Position</label>
            <input type="text" name={`position ${ id }{ id }`} id={`position ${ id }{ id }`} />

            <label htmlFor={`responsibilities ${ id }{ id }`}>Responsibilities</label>
            <input type="text" name={`responsibilities ${ id }{ id }`} id={`responsibilities ${ id }{ id }`} />
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
    const [companyIds, setIds] = useState([crypto.randomUUID()]);

    function addId() {
        const newIds = companyIds.concat([crypto.randomUUID()]);
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
            <input type="tel" name="phoneNum" id="phoneNum" />

            <h2>Education</h2>

            <label htmlFor="school">School Name</label>
            <input type="text" name="school" id="school" />

            <label htmlFor="major">Major</label>
            <input type="text" name="major" id="major" />

            <label htmlFor="gpa">GPA</label>
            <input type=" number" name="gpa" id="gpa" />

            <h2>Experience</h2>
            <button type="button" onClick={addId}>Add Company</button>

            <DisplayCompanies ids={companyIds}/>
        </>
    )
};

export default Input