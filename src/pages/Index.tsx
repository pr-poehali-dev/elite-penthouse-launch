import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { penthouses, getMoscowPenthouses, getSpbPenthouses } from '@/data/penthouses';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', city: 'moscow', comment: '' });
  const [privacy, setPrivacy] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) {
      toast({ 
        title: 'Ошибка', 
        description: 'Необходимо согласие на обработку персональных данных',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/afbde8b1-2f36-427a-8f6b-d083c11c0311', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadForm),
      });

      if (response.ok) {
        toast({ 
          title: 'Заявка отправлена', 
          description: 'Мы свяжемся с вами в ближайшее время' 
        });
        setLeadForm({ name: '', phone: '', city: 'moscow', comment: '' });
        setPrivacy(false);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка отправки', 
        description: 'Попробуйте позже или позвоните нам',
        variant: 'destructive'
      });
    }
  };

  const featuredPenthouses = penthouses.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gold tracking-wider">ПРЕМИУМ ПЕНТХАУСЫ</h2>
          <nav className="hidden md:flex gap-8">
            <a href="#catalog" className="text-sm hover:text-gold transition-colors">Каталог</a>
            <a href="#altai" className="text-sm hover:text-gold transition-colors">Алтай</a>
            <a href="#about" className="text-sm hover:text-gold transition-colors">О нас</a>
            <a href="#contact" className="text-sm hover:text-gold transition-colors">Контакты</a>
          </nav>
          <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
            +7 (921) 006-6000
          </Button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background via-graphite to-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-gold/20 text-gold border-gold">Элитная недвижимость</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Элитные пентхаусы <br />
                <span className="text-gold">Москвы и Санкт-Петербурга</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Панорамные виды, приватность, архитектура высшего класса. 
                Юридическое сопровождение сделок под ключ.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/90">
                  Получить подборку
                </Button>
                <Button size="lg" variant="outline" className="border-platinum text-platinum hover:bg-platinum hover:text-black">
                  Записаться на показ
                </Button>
              </div>
              
              <div className="mt-8 p-6 border border-border rounded-lg bg-card/50 backdrop-blur">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input 
                    placeholder="Ваше имя" 
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                    className="bg-background border-muted"
                    required
                  />
                  <Input 
                    placeholder="+7 (___) ___-__-__" 
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                    className="bg-background border-muted"
                    required
                  />
                  <select 
                    className="w-full p-2 bg-background border border-muted rounded-md text-foreground"
                    value={leadForm.city}
                    onChange={(e) => setLeadForm({...leadForm, city: e.target.value})}
                  >
                    <option value="moscow">Москва</option>
                    <option value="spb">Санкт-Петербург</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="privacy" 
                      checked={privacy}
                      onCheckedChange={(checked) => setPrivacy(checked as boolean)}
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      Согласен на обработку персональных данных
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-gold text-black hover:bg-gold/90">
                    Отправить заявку
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <img 
                src="/img/79790d18-8aa0-40e1-9b1a-8ac342af3eef.jpg" 
                alt="Элитный пентхаус"
                className="rounded-lg shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/80 backdrop-blur rounded-lg border border-gold/30">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-gold" />
                    <span>Остоженка, 25</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Maximize" size={16} className="text-gold" />
                    <span>330 м²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={16} className="text-gold" />
                    <span>Панорама на Кремль</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-graphite/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Почему пентхаус</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Shield', title: 'Приватность', desc: 'Максимальная конфиденциальность на верхних этажах' },
              { icon: 'Eye', title: 'Панорамные виды', desc: 'Захватывающие виды на город 360°' },
              { icon: 'Home', title: 'Собственная терраса', desc: 'Личное пространство под открытым небом' },
              { icon: 'Flame', title: 'Камины и потолки', desc: 'Высокие потолки до 5 метров, действующие камины' },
              { icon: 'Car', title: 'VIP-паркинг', desc: 'Личные машиноместа в охраняемом паркинге' },
              { icon: 'Lock', title: 'Безопасность', desc: 'Круглосуточная охрана и консьерж-сервис' }
            ].map((item, i) => (
              <Card key={i} className="bg-card/50 border-border hover:border-gold transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <Icon name={item.icon} size={48} className="text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Каталог пентхаусов</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Избранные объекты в Москве и Санкт-Петербурге. 
            Каждый пентхаус проверен и готов к сделке.
          </p>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="moscow">Москва</TabsTrigger>
              <TabsTrigger value="spb">Санкт-Петербург</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                {featuredPenthouses.map((penthouse, i) => (
                  <Card 
                    key={penthouse.id} 
                    className="overflow-hidden border-border hover:border-gold transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={penthouse.images[0]} 
                        alt={penthouse.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {penthouse.altaiOffer && (
                        <Badge className="absolute top-4 right-4 bg-gold text-black">
                          + Участок в Алтае
                        </Badge>
                      )}
                      {penthouse.status === 'reserved' && (
                        <Badge className="absolute top-4 left-4 bg-red-600">
                          Забронирован
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{penthouse.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{penthouse.district}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Maximize" size={14} className="text-gold" />
                          <span>{penthouse.area} м²</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Building" size={14} className="text-gold" />
                          <span>{penthouse.floor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="ArrowUpDown" size={14} className="text-gold" />
                          <span>{penthouse.ceilingHeight} м</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Home" size={14} className="text-gold" />
                          <span>{penthouse.rooms} комн</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Icon name="Eye" size={14} className="text-gold" />
                        <span className="text-sm text-muted-foreground">{penthouse.view[0]}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-2xl font-bold text-gold">{penthouse.price}</span>
                        <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-black">
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="moscow">
              <div className="grid md:grid-cols-3 gap-8">
                {getMoscowPenthouses().map((penthouse) => (
                  <Card key={penthouse.id} className="overflow-hidden border-border hover:border-gold transition-all duration-300">
                    <img src={penthouse.images[0]} alt={penthouse.name} className="w-full h-64 object-cover" />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{penthouse.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{penthouse.district}</p>
                      <div className="text-2xl font-bold text-gold">{penthouse.price}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="spb">
              <div className="grid md:grid-cols-3 gap-8">
                {getSpbPenthouses().map((penthouse) => (
                  <Card key={penthouse.id} className="overflow-hidden border-border hover:border-gold transition-all duration-300">
                    <img src={penthouse.images[0]} alt={penthouse.name} className="w-full h-64 object-cover" />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{penthouse.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{penthouse.district}</p>
                      <div className="text-2xl font-bold text-gold">{penthouse.price}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="altai" className="py-20 px-6 bg-gradient-to-r from-graphite via-black to-graphite">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gold/20 text-gold border-gold">Специальное предложение</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Подарок к покупке пентхауса — <span className="text-gold">участок 15 соток в Горном Алтае</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Уникальная возможность: при покупке избранных пентхаусов вы получаете земельный участок 
                в туристско-рекреационной локации Горного Алтая с природоохранными территориями поблизости.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Чистый воздух и горные панорамы</h4>
                    <p className="text-sm text-muted-foreground">Уникальная природная локация с видами на горы</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">15 соток в собственность</h4>
                    <p className="text-sm text-muted-foreground">Категория и ВРИ указываются в индивидуальном предложении</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={24} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Юридическая чистота</h4>
                    <p className="text-sm text-muted-foreground">Земли не относятся к особо охраняемым природным территориям</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted/20 rounded-lg border border-border mb-6">
                <p className="text-xs text-muted-foreground">
                  <strong>Юридический дисклеймер:</strong> Фактические условия предоставления участка зависят от статуса земли 
                  и действующего законодательства. Участок предоставляется в разрешённой для частной собственности зоне. 
                  Конкретное местоположение, категория и вид разрешённого использования, ограничения и сервитуты 
                  фиксируются в индивидуальном предложении и договоре. Перед сделкой предоставляется выписка ЕГРН 
                  и правовая экспертиза.
                </p>
              </div>

              <Button size="lg" className="bg-gold text-black hover:bg-gold/90">
                Узнать условия оффера
              </Button>
            </div>
            
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img 
                src="/img/a6d1def0-d5d4-4735-ad5a-daa482d0b87f.jpg" 
                alt="Горный Алтай"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h3 className="text-2xl font-bold mb-2">Горный Алтай</h3>
                <p className="text-sm text-muted-foreground">Первозданная природа, чистейший воздух, тишина</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-graphite/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Гарантии и безопасность</h2>
            <p className="text-muted-foreground">Ваше спокойствие — наш приоритет</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-8">
                <Icon name="FileCheck" size={48} className="text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Юридическое сопровождение</h3>
                <p className="text-muted-foreground">Проверка документов и сопровождение сделки под ключ</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-8">
                <Icon name="ShieldCheck" size={48} className="text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Конфиденциальность</h3>
                <p className="text-muted-foreground">Полная анонимность на всех этапах сделки</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-8">
                <Icon name="Award" size={48} className="text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Проверенные объекты</h3>
                <p className="text-muted-foreground">Работаем только с надёжными девелоперами</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gold mb-4">ПРЕМИУМ ПЕНТХАУСЫ</h3>
              <p className="text-sm text-muted-foreground">Элитная недвижимость Москвы и Санкт-Петербурга</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#catalog" className="hover:text-gold transition-colors">Каталог</a></li>
                <li><a href="#altai" className="hover:text-gold transition-colors">Алтай оффер</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">О нас</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (921) 006-6000</li>
                <li>info@premium-penthouses.ru</li>
                <li>Москва, ул. Арбат, 1</li>
                <li>СПб, Невский пр., 1</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мессенджеры</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="border-gold text-gold hover:bg-gold hover:text-black">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="border-gold text-gold hover:bg-gold hover:text-black">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p className="mb-2">
              Информация на сайте носит справочный характер и не является публичной офертой (ст. 437 ГК РФ).
            </p>
            <p>© 2025 Премиум Пентхаусы. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;