
import {Helmet} from 'react-helmet-async';




export default function ApplicationPage() {
    return (
        <div>
            <Helmet>
                <title>Мобилно приложение | Ен Такси Стара Загора</title>
                <meta name="description" content="Свали приложението на Ен Такси за лесна и бърза поръчка на такси в Стара Загора." />
            </Helmet>
           
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Нашето мобилно приложение</h1>
            <p className="text-gray-600 mb-8">Поръчай такси бързо, лесно и надеждно само с няколко клика директно от твоя смартфон.</p>
        </div>
    );
}
