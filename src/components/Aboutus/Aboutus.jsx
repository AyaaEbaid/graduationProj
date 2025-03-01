import React from "react";
import style from './Aboutus.module.css'
 import photo1 from './../../assets/photo1.png'
 import photo2 from './../../assets/pic 2.png'
 import photo3 from './../../assets/photo2.png'
export default function About() {
  return (
  <>
<section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center font-changa">
          نبذة عنا
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="flex flex-col items-center">
            <div className="w-72 h-72">
              <img
                src={photo3}
                alt="icon1"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-6 text-gray-700 text-lg leading-loose text-center font-medium">
            "هنشطبهالك"  منصة إلكترونية تربط أصحاب الشقق 
الباحثين عن خدمات التشطيب والديكور مع الحرفيين
 والمحلات المتخصصة في توفير المواد والخامات اللازمة 
لتسهيل عملية التشطيب بطريقة شاملة ومباشرة.
            </p>
          </div>

          
          <div className="flex flex-col items-center">
            <div className="w-72 h-72">
              <img
                src={photo2}
                alt="icon2"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-6 text-gray-700 text-lg leading-loose text-center font-medium">
            تسجيل حسابات لأصحاب الشقق، الحرفيين، وأصحاب المحلات.
بحث ذكي حسب التخصص والموقع. أنظمة تقييم متبادلة لضمان الجودة. 
إدارة الحجوزات والمواعيد. خيارات دفع آمنة ومتنوعة. 
 إشعارات وتذكيرات للمواعيد. 
            </p>
          </div>

          
          <div className="flex flex-col items-center">
            <div className="w-72 mt-11">
              <img
                src={photo1}
                alt="icon3"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-14 text-gray-700 text-lg leading-loose text-center font-medium">
            وجهتك الشاملة للتشطيبات ، حيث يجتمع أصحاب الشقق 
والمحلات مع أفضل العمال لتنفيذ مشاريعهم بسهولة واحترافية.
استكشف الخدمات، اختر فريقك، وابدأ مشروعك اليوم!"
            </p>
          </div>
        </div>
      </div>
    </section>
 
  </>
  );
}

  
  