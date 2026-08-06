function Company({ company }) {
    return (
        <div className="cv-company">
            <div className="cv-company-title">
                <span className="cv-company-name">{company.companyName}</span>
                <span className="cv-company-position">{company.companyPosition}</span>
            </div>
            <p className="cv-company-responsibilities">{company.companyResponsibilities}</p>
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
            <div className="cv-display">
                <h1 className="cv-name">{formData.get("name")}</h1>
                <div className="cv-contact-row">
                    <span>{formData.get("email")}</span>
                    <span>{formData.get("phoneNum")}</span>
                </div>

                <div className="cv-section">
                    <h2>Education</h2>
                    <div className="cv-detail-row">
                        <span className="cv-detail-label">School:</span>
                        <span>{formData.get("school")}</span>
                    </div>
                    <div className="cv-detail-row">
                        <span className="cv-detail-label">Major:</span>
                        <span>{formData.get("major")}</span>
                    </div>
                    <div className="cv-detail-row">
                        <span className="cv-detail-label">GPA:</span>
                        <span>{formData.get("gpa")}</span>
                    </div>
                </div>

                <div className="cv-section">
                    <h2>Experience</h2>
                    <DisplayCompanies formData={formData} />
                </div>
            </div>
        )
    }
}

export default Display
