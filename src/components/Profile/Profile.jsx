import './profile.css';

export function Profile({ data }) {

    return (
        <>

            {data ? (
                <>
                    <div className="user-info">
                        <img className="avatar" src={data.avatar_url} />
                        <div className='user-stats'>
                        <div className="profile-info">
                            <h3>Seguidores | <span className="info-number">{data.followers}</span></h3>
                        </div>
                        <div className="profile-info">
                        <h3>Siguiendo | <span className="info-number">{data.following}</span></h3>

                        </div>
                        <div className="profile-info">
                        <h3>Localidad | <span className="info-number">{data.location}</span></h3>

                        </div>
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