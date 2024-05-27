import React, { useState } from "react";
import ChatBot from "react-chatbotify";
import Stars from "../src/components/raiting/raiting"; 

const MyChatBot = () => {
      const [form, setForm] = useState({});
      const [rating, setRating] = useState(0);
    
      const handleRating = (rate) => {
        setRating(rate);
        setForm({ ...form, rating: rate });
      };

      const handleChoice = (params) => {
            setForm(currentForm => ({ ...currentForm, choice: params.userInput }));
          };
    
      const flow = {
            start: {
                  message: "Lütfen bir seçenek seçin: Colin's Web ya da Colin's Mağazaları",
                  options: ["Colin's Web", "Colin's Mağazaları"],
                  function: handleChoice,
                  path: (params) => (params.userInput === "Colin's Web" ? "web_options" : "store_options"),
                },
        web_options: {
          message: "Siparişlerim ve Kargo seçeneklerini seçin",
          options: ["Siparişlerim", "Kargo"],
          function: (params) => setForm({ ...form, web_option: params.userInput }),
          path: (params) => (params.userInput === "Siparişlerim" ? "order_questions" : "shipping_options"),
        },
        order_questions: {
          message: "Nasıl iptal edebilirim veya ne zaman gelir?",
          options: ["İptal", "Teslimat Süresi"],
          function: (params) => setForm({ ...form, order_question: params.userInput }),
          path: (params) => (params.userInput === "İptal" ? "cancel_info" : "delivery_info"),
        },
        shipping_options: {
          message: "Ürünüm yanlış geldi veya ürünüm kusurlu geldi seçeneklerinden birini seçiniz.",
          options: ["Ürünüm yanlış geldi", "Ürünüm kusurlu geldi"],
          function: (params) => setForm({ ...form, shipping_option: params.userInput }),
          path: (params) => (params.userInput === "Ürünüm yanlış geldi" ? "wrong_product_info" : "faulty_product_info"),
        },
        cancel_info: {
          message: "Değerli müşterimiz, siparişi verilmiş ürünlerin iptali yapılamamaktadır. Siparişinizi verdiğiniz ürünler verilen adreste ilgili kişiler bulunamadığı taktirde tekrar Colin's'e iade edilecektir. Yapılacak kontroller sonrası ödemiş olduğunuz tutar tarafınıza iade edilir. 💳💵 Ayrıntılı bilgi için 444 53 26 Colin's Müşteri Destek hattını arayabilirsiniz. 😊 Başka bir işlem yapmak istiyor musunuz?",
          options: ["Evet", "Hayır"],
          function: (params) => setForm({ ...form, another_action: params.userInput }),
          path: (params) => (params.userInput === "Evet" ? "start" : "rate_experience"),
        },
        rate_experience: {
          message: "Lütfen deneyiminizi değerlendirin:",
          render: (
            <Stars
              count={5}
              defaultRating={0}
              icon="★"
              color="yellow"
              iconSize={24}
              onClick={handleRating} // handleRating fonksiyonunu onClick prop'una veriyoruz
            />
          ),
          options: ["Gönder"],
          path: "end",
        },
        end: {
          message: `Değerlendirmeniz için teşekkür ederiz! ${form.rating} yıldız verdiniz. Yorumunuz kaydedildi.`,
        },
      };
    
      return (
        <ChatBot
          options={{
            chatHistory: { storageKey: "example_advanced_form" },
          }}
          flow={flow}
        />
      );
    };
    
    export default MyChatBot;