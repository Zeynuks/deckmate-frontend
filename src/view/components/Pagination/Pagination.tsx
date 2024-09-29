import React from 'react';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="pagination">
            <ul style={{ listStyle: 'none', display: 'flex', padding: 0, margin: 0 }}>
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ marginRight: '0.5em', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                        &laquo;
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            style={{
                                marginRight: '0.5em',
                                backgroundColor: currentPage === number ? '#007BFF' : 'transparent',
                                color: currentPage === number ? '#fff' : '#000',
                                cursor: 'pointer',
                            }}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};
