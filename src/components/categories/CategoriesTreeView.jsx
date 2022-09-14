import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { TreeView, TreeItem } from '@mui/lab';
import { Delete, AddCircleOutline } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import ConfirmDeleteDialog from '../common/ConfirmDeleteDialog'
import categoriesService from '../../service/categoriesService'
import CategoriesDialog from "./CategoriesDialog"
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

const baseCategoriesURL = 'http://www.tochangehybrid.com/groceriesImages/categories/';
export default function CategoriesTreeView({ allowEdit, onSelect, categories, setcategories }) {


    const [allCategories, setallCategories] = useState([categories]);
    const [baseCategories, setbaseCategories] = useState([]);
    const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
    const [selectedCategory, setselectedCategory] = useState(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const _allCategories = categories;
        if (!categories) return
        _allCategories.forEach(category => {
            category.subcategories = _allCategories.filter(c => c.parentid === category.id)
        })
        setallCategories(_allCategories)
        setbaseCategories(_allCategories.filter(c => c.parentid === 0))
    }, [categories])
    console.log(allCategories)

    const renderCategoryLabel = (category) => {
        const class_name = (category.categorytype === 1) ? 'row  bg-primary text-wrap' : 'row';
        const imgsrc = `${baseCategoriesURL}${category.id}.jpg`;
        //console.log(imgsrc);
        return (
            <div className={class_name}>
                <div className='col-9'>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <span>{category.id}</span>
                                <Avatar alt="Remy Sharp" src={imgsrc} />
                            </ListItemIcon>
                            <ListItemText primary={category.nameen} />
                           
                            <span className='text-secondary mx-2'>{category.namear}</span>
                        </ListItem>
                    </List>
                </div>
                {allowEdit && <div className='col'>
                    <IconButton
                        color='error'
                        disabled={category.subcategories.length > 0}
                        onClick={async () => {
                            setselectedCategory(category)
                            setopenConfirmDelDlg(true)
                        }}>
                        <Delete />
                    </IconButton>
                    <IconButton
                        color="primary"
                        disabled={category.categorytype !== 0}
                        onClick={() => {
                            setselectedCategory({ id: 0, parentid: category.id, nameen: '', namear: '', logo: '', descriptionen: '', descriptionar: '' });
                            setOpen(true)
                        }}
                    >
                        <AddCircleOutline />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() => {
                            setselectedCategory(category);
                            setOpen(true)
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>}
            </div>
        )


    }

    const renderCategory = (category) => {
        return (
            <div>
                <TreeItem nodeId={category.id} key={category.id} label={renderCategoryLabel(category)} onClick={() => onSelect(category)}>
                    {category.subcategories.map(sc => renderCategory(sc))}
                </TreeItem>
            </div>
        )
    }
    return (<div>
        {allowEdit && <div>
            <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => {
                    setselectedCategory({ id: 0, nameen: '', namear: '', logo: '', descriptionen: '', descriptionar: '', parentid: 0 });
                    setOpen(true)
                }}>
                <AddCircleOutline />
            </IconButton>
        </div>}
        <TreeView >
            {baseCategories.map(bc => renderCategory(bc))}
        </TreeView>
        <ConfirmDeleteDialog
            open={openConfirmDelDlg}
            setopen={setopenConfirmDelDlg}
            text={`catugure ${selectedCategory && selectedCategory.nameen}  will be deleted permenantly, are you sure?`}
            onConfirm={async () => {
                if (!selectedCategory) return;
                await categoriesService._delete(selectedCategory.id);
                await setcategories();
            }}
        />
        <CategoriesDialog
            open={open}
            setOpen={setOpen}
            category={selectedCategory}
            onUpdate={async () => { await setcategories() }}
        />
    </div>)

}