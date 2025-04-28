import NoInternet from '../img/no_connection.png'

export function OfflineContent(){
    return(
      <div className='offlineContent'>
        <img src={NoInternet} width='100' alt='no connection' />
        <h2>No Internet Connection</h2>
        <p>Please check your internet connectivity and try again</p>
      </div>
    )
}