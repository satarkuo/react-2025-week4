import PropTypes from 'prop-types'; 

function Pagination ({pageInfo, handlePageChange}) {
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a className={`page-link ${!pageInfo.has_pre && 'disabled'}`} href="#"
                        onClick={() => handlePageChange(pageInfo.current_page-1)}>&laquo;</a>
                </li>
                {Array.from({length: pageInfo.total_pages}).map((_,index) => (
                    <li className={`page-item ${pageInfo.current_page === index+1 && 'active'}`} key={index}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(index+1)}>{index+1}</a>
                    </li>
                ))}                      
                <li className="page-item">
                    <a className={`page-link ${!pageInfo.has_next && 'disabled'}`} href="#"
                        onClick={() => handlePageChange(pageInfo.current_page+1)}>&raquo;</a>
                </li>
            </ul>
        </nav>
    )
}
export default Pagination;
Pagination.propTypes = {
    pageInfo: PropTypes.object.isRequired,
    handlePageChange: PropTypes.func.isRequired
}