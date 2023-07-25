// Hooks and Types React
import { ChangeEvent, useEffect, useState } from "react";
// React Router DOM
import { useNavigate, useParams } from "react-router-dom";
// Sweet Alert
import Swal from "sweetalert2";
// Material UI
import { Box, TextField, Button } from '@mui/material';
import { getItem, updateItem, removeItem } from "../../services/book.service";
import { IBookData } from "../../types/book.type";

export const DetailBook = () => {

    const { id } = useParams();
    let navigate = useNavigate();

    const initialBookState: IBookData = {
        _id: null,
        title: "",
        description: "",
        publicationYear: 0,
        genre: "",
        author: ""
    };

    const [currentBook, setCurrentBook] = useState<IBookData>(initialBookState);

    const getTutorial = (id: string) => {
        getItem(id)
            .then(({ data }) => {
                setCurrentBook(data);
            })
            .catch((e: Error) => {
                Swal.fire('Error', `Can't get data`, 'error');
                console.log(e);
            });
    };

    useEffect(() => {
        if (id) getTutorial(id);
    }, [id]);

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setCurrentBook({ ...currentBook, [name]: value });
    };

    const updateBook = () => {
        updateItem(currentBook['_id'], {...currentBook, publicationYear:Number(currentBook.publicationYear)})
            .then(() => {
                Swal.fire(`${currentBook.title} Updated Successfully.`, '', 'success');
                navigate("/books");
            })
            .catch((e: Error) => {
                Swal.fire('Error', e.message, 'error');
                console.log(e);
            });
    };

    const cancelUpdate = () => {
        navigate("/books");
    };

    return (
        <div className="edit-form">
            <h4 className="text-center">View Detail Book</h4>

            <Box component='form' noValidate autoComplete='off' sx={{ '& > :not(style)': { m: 1 } }}>
                <TextField
                    label='Title'
                    name='title'
                    value={currentBook.title}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a title"
                />
                <TextField
                    label='Author'
                    name='author'
                    value={currentBook.author}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a author"
                />
                <TextField
                    type="number"
                    label='Publication Year'
                    name='publicationYear'
                    value={currentBook.publicationYear}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a publicationYear"
                />
                <TextField
                    label='Genre'
                    name='genre'
                    value={currentBook.genre}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a genre"
                />
                <TextField
                    label='Description'
                    name='description'
                    value={currentBook.description}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Enter a description"
                />

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'right', '& > :not(style)': { m: 1 } }}>
                <Button variant='contained' color='success' onClick={updateBook}>
                    Update
                </Button>
                <Button variant='contained' color='error' onClick={cancelUpdate}>
                    Cancel
                </Button>
            </Box>
        </div>
    )
}
