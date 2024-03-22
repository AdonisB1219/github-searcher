import './profile.css';

export function Profile({ data }) {

    return (
        <>

            {data ? (
                <>
                    <div className="user-info">
                        <img className="avatar" src={data.avatar_url} />
                        <div className="profile-info">
                            <h3>Followers | <span className="info-number">{data.followers}</span></h3>
                        </div>
                        <div className="profile-info">
                        <h3>Following | <span className="info-number">{data.following}</span></h3>

                        </div>
                        <div className="profile-info">
                        <h3>Location | <span className="info-number">{data.location}</span></h3>

                        </div>
                    </div>
                    <div className="username">
                        <h1>{data.login}</h1>
                        <p>{data.bio}</p>
                    </div>
                </>
            ) : (
                <h1>Introduce un username</h1>
            )}
        </>
    )
}