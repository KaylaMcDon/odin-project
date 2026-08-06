import { useState } from 'react';

function Company({ id }) {
    return (
        <div className="company-card">
            <div className="field-grid">
                <div className="field">
                    <label htmlFor={`companyName ${id}`}>Company Name</label>
                    <input type="text" name={`companyName ${id}`} id={`companyName ${id}`} />
                </div>

                <div className="field">
                    <label htmlFor={`companyPosition ${id}`}>Position</label>
                    <input type="text" name={`companyPosition ${id}`} id={`companyPosition ${id}`} />
                </div>
            </div>

            <div className="field">
                <label htmlFor={`companyResponsibilities ${id}`}>Responsibilities</label>
                <input type="text" name={`companyResponsibilities ${id}`} id={`companyResponsibilities ${id}`} />
            </div>
        </div>
    )
}

function DisplayCompanies({ ids }) {
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
            <section className="form-section">
                <h2>General Information</h2>

                <div className="field-grid">
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>

                    <div className="field">
                        <label htmlFor="phoneNum">Phone Number</label>
                        <input type="number" name="phoneNum" id="phoneNum" />
                    </div>
                </div>
            </section>

            <section className="form-section">
                <h2>Education</h2>

                <div className="field-grid">
                    <div className="field">
                        <label htmlFor="school">School Name</label>
                        <input type="text" name="school" id="school" />
                    </div>

                    <div className="field">
                        <label htmlFor="major">Major</label>
                        <input type="text" name="major" id="major" />
                    </div>

                    <div className="field">
                        <label htmlFor="gpa">GPA</label>
                        <input type="number" name="gpa" id="gpa" />
                    </div>
                </div>
            </section>

            <section className="form-section">
                <div className="section-header">
                    <h2>Experience</h2>
                    <button type="button" className="btn btn-secondary" onClick={addId}>+ Add Company</button>
                </div>

                <DisplayCompanies ids={companyIds} />
            </section>
        </>
    )
};

export default Input
