import { useState } from 'react';
import ItemCard from '../items/ItemCard';  // Assuming you have ItemCard component for displaying items

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import static items data
import items from '../../assets/items.json';

const categories = ["Choose a category", "medicine", "equipment", "supplement"];

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a category");

    const filteredItems = selectedCategory === "Choose a category"
        ? items
        : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Selling Medicines</h2>
            
            {/* Category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" 
                    id="category" 
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {filteredItems.length > 0 && filteredItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ItemCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default TopSellers;
