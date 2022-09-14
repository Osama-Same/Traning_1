import React, { useState, useEffect } from 'react';
import categoriesService from "../../service/categoriesService"
import CategoriesTreeView from './CategoriesTreeView'
export function CategoriesAdminPage() {
    const [selectedCategory, setselectedCategory] = useState(null)
    const [categories, setcategories] = useState([]);
    useEffect(() => {
        update();
    }, []);
    const update = async () => {
        const _categories = await categoriesService._get();
        setcategories(_categories);
    }
    return (<div>
            <div className='row'>
                <div className='col-6'>
                    <CategoriesTreeView
                        allowEdit={true}
                        setcategories={(category) => setselectedCategory(category)}
                        categories={categories} />
                </div>
                <div className='col'>
                    {selectedCategory && <div>
                        <span className='text-primary mx-2'>{selectedCategory.id}</span>
                        <span className='text-primary mx-2'>{selectedCategory.publishednameen}</span>
                        <span className='text-primary mx-2'>{selectedCategory.publishednamear}</span>
                    </div>}
                </div>
            </div>
        
    </div>)
}