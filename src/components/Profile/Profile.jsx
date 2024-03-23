import './profile.css';
import { useUserStore } from "../store/repositoriesStore";


export function Profile() {
    const {userData, error} = useUserStore((state) => (state));

    return (
        <>

            {userData ? (
                <div className='user-profile'>
                    <div className="user-info">
                        <img className="avatar" src={userData.avatarUrl} />
                        <div className='user-stats'>
                        <div className="profile-info">
                            <h3>Seguidores | <span className="info-number">{userData.followers?.totalCount}</span></h3>
                        </div>
                        <div className="profile-info">
                        <h3>Siguiendo | <span className="info-number">{userData.following?.totalCount}</span></h3>

                        </div>
                        <div className="profile-info">
                        <h3>Localidad | <span className="info-number">{userData.location}</span></h3>

                        </div>
                        </div>
                    </div>
                    <div className="username">
                        <h1>{userData.login}</h1>
                        <p>{userData.bio}</p>
                    </div>
                </div>
            ) : (
                 error ? (<h1 className='error'>Ocurrió un error, intenta con otro usuario.</h1>) : (<h1>Introduce un username</h1>)
            )}
        </>
    )
}