import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Festival {
  id: number;
  name: string;
  country: string;
  location: string;
  year: number;
  status: 'active' | 'upcoming' | 'completed';
}

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  awards: number;
}

interface Award {
  id: number;
  name: string;
  festival: string;
  year: number;
  recipient: string;
}

interface Judge {
  id: number;
  name: string;
  profession: string;
  nationality: string;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const festivals: Festival[] = [
    { id: 1, name: 'Каннский кинофестиваль', country: 'Франция', location: 'Канны', year: 2024, status: 'active' },
    { id: 2, name: 'Венецианский кинофестиваль', country: 'Италия', location: 'Венеция', year: 2024, status: 'upcoming' },
    { id: 3, name: 'Берлинале', country: 'Германия', location: 'Берлин', year: 2023, status: 'completed' },
  ];

  const movies: Movie[] = [
    { id: 1, title: 'Анатомия падения', director: 'Жюстин Триет', year: 2023, genre: 'Драма', awards: 3 },
    { id: 2, title: 'Зона интересов', director: 'Джонатан Глейзер', year: 2023, genre: 'Исторический', awards: 2 },
    { id: 3, title: 'Прошлые жизни', director: 'Селин Сонг', year: 2023, genre: 'Мелодрама', awards: 1 },
  ];

  const awards: Award[] = [
    { id: 1, name: 'Золотая пальмовая ветвь', festival: 'Канны', year: 2023, recipient: 'Анатомия падения' },
    { id: 2, name: 'Гран-при жюри', festival: 'Канны', year: 2023, recipient: 'Зона интересов' },
    { id: 3, name: 'Приз за режиссуру', festival: 'Берлин', year: 2023, recipient: 'Музыка тишины' },
  ];

  const judges: Judge[] = [
    { id: 1, name: 'Кейт Бланшетт', profession: 'Актриса', nationality: 'Австралия' },
    { id: 2, name: 'Руис Ньевес', profession: 'Режиссёр', nationality: 'Испания' },
    { id: 3, name: 'Дени Вильнёв', profession: 'Режиссёр', nationality: 'Канада' },
  ];

  const stats = {
    totalFestivals: festivals.length,
    totalMovies: movies.length,
    totalAwards: awards.length,
    totalJudges: judges.length,
    activeFestivals: festivals.filter(f => f.status === 'active').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-accent text-accent-foreground';
      case 'upcoming':
        return 'bg-secondary text-secondary-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активный';
      case 'upcoming':
        return 'Предстоящий';
      case 'completed':
        return 'Завершён';
      default:
        return status;
    }
  };

  const filteredFestivals = festivals.filter(
    f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         f.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMovies = movies.filter(
    m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         m.director.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center">
                <Icon name="Film" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FilmFestival CMS
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-card border border-border p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary">
              <Icon name="LayoutDashboard" size={18} className="mr-2" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="festivals" className="data-[state=active]:bg-primary">
              <Icon name="Calendar" size={18} className="mr-2" />
              Фестивали
            </TabsTrigger>
            <TabsTrigger value="movies" className="data-[state=active]:bg-primary">
              <Icon name="Film" size={18} className="mr-2" />
              Фильмы
            </TabsTrigger>
            <TabsTrigger value="awards" className="data-[state=active]:bg-primary">
              <Icon name="Award" size={18} className="mr-2" />
              Награды
            </TabsTrigger>
            <TabsTrigger value="judges" className="data-[state=active]:bg-primary">
              <Icon name="Users" size={18} className="mr-2" />
              Судьи
            </TabsTrigger>
            <TabsTrigger value="directors" className="data-[state=active]:bg-primary">
              <Icon name="Clapperboard" size={18} className="mr-2" />
              Режиссёры
            </TabsTrigger>
            <TabsTrigger value="participants" className="data-[state=active]:bg-primary">
              <Icon name="UserCheck" size={18} className="mr-2" />
              Участники
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:scale-105 transition-transform duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Всего фестивалей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.totalFestivals}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.activeFestivals} активных
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:scale-105 transition-transform duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Фильмов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">{stats.totalMovies}</div>
                  <p className="text-xs text-muted-foreground mt-1">В базе данных</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:scale-105 transition-transform duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Наград</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">{stats.totalAwards}</div>
                  <p className="text-xs text-muted-foreground mt-1">Присуждено</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:scale-105 transition-transform duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Судей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-500">{stats.totalJudges}</div>
                  <p className="text-xs text-muted-foreground mt-1">В жюри</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border-pink-500/20 hover:scale-105 transition-transform duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Режиссёров</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-500">24</div>
                  <p className="text-xs text-muted-foreground mt-1">Зарегистрировано</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-primary" />
                    Активные фестивали
                  </CardTitle>
                  <CardDescription>Фестивали, проходящие в данный момент</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {festivals.filter(f => f.status === 'active').map((festival) => (
                    <div
                      key={festival.id}
                      className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{festival.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            <Icon name="MapPin" size={14} className="inline mr-1" />
                            {festival.location}, {festival.country}
                          </p>
                        </div>
                        <Badge className={getStatusColor(festival.status)}>
                          {getStatusText(festival.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Star" className="text-secondary" />
                    Недавние награды
                  </CardTitle>
                  <CardDescription>Последние присуждённые награды</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {awards.slice(0, 3).map((award) => (
                    <div
                      key={award.id}
                      className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{award.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{award.recipient}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {award.festival} • {award.year}
                          </p>
                        </div>
                        <Icon name="Trophy" size={24} className="text-secondary" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="festivals" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск фестивалей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить фестиваль
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый фестиваль</DialogTitle>
                    <DialogDescription>Добавьте информацию о кинофестивале</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название</Label>
                      <Input id="name" placeholder="Каннский кинофестиваль" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Страна</Label>
                        <Input id="country" placeholder="Франция" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Город</Label>
                        <Input id="location" placeholder="Канны" />
                      </div>
                    </div>
                    <Button className="w-full">Создать фестиваль</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFestivals.map((festival) => (
                <Card key={festival.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{festival.name}</CardTitle>
                      <Badge className={getStatusColor(festival.status)}>
                        {getStatusText(festival.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={16} />
                      {festival.location}, {festival.country}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      {festival.year}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={16} className="mr-1" />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Eye" size={16} className="mr-1" />
                        Просмотр
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="movies" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск фильмов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить фильм
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый фильм</DialogTitle>
                    <DialogDescription>Добавьте информацию о фильме</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название</Label>
                      <Input id="title" placeholder="Анатомия падения" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="director">Режиссёр</Label>
                        <Input id="director" placeholder="Жюстин Триет" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Год</Label>
                        <Input id="year" type="number" placeholder="2023" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genre">Жанр</Label>
                      <Input id="genre" placeholder="Драма" />
                    </div>
                    <Button className="w-full">Создать фильм</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMovies.map((movie) => (
                <Card key={movie.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{movie.title}</CardTitle>
                    <CardDescription>{movie.director}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Год выпуска</span>
                      <span className="font-medium">{movie.year}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Жанр</span>
                      <Badge variant="outline">{movie.genre}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Наград</span>
                      <span className="font-medium flex items-center gap-1">
                        <Icon name="Award" size={16} className="text-secondary" />
                        {movie.awards}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={16} className="mr-1" />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Eye" size={16} className="mr-1" />
                        Просмотр
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="awards" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Награды</h2>
              <Button className="gap-2">
                <Icon name="Plus" size={18} />
                Добавить награду
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {awards.map((award) => (
                    <div key={award.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Icon name="Trophy" size={24} className="text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{award.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {award.recipient} • {award.festival} {award.year}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Icon name="Edit" size={18} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="judges" className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Судьи</h2>
              <Button className="gap-2">
                <Icon name="Plus" size={18} />
                Добавить судью
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {judges.map((judge) => (
                <Card key={judge.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                        {judge.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{judge.name}</CardTitle>
                        <CardDescription>{judge.profession}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Globe" size={16} />
                      {judge.nationality}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={16} className="mr-1" />
                        Изменить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="directors" className="space-y-6 animate-fade-in">
            <div className="text-center py-12">
              <Icon name="Clapperboard" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Раздел в разработке</h3>
              <p className="text-muted-foreground mb-4">Управление режиссёрами будет доступно в следующей версии</p>
              <Button>
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить режиссёра
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="participants" className="space-y-6 animate-fade-in">
            <div className="text-center py-12">
              <Icon name="UserCheck" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Раздел в разработке</h3>
              <p className="text-muted-foreground mb-4">Управление участниками будет доступно в следующей версии</p>
              <Button>
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить участника
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" className="text-accent" />
                  Аналитика и отчёты
                </CardTitle>
                <CardDescription>Статистика по фестивалям и наградам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="PieChart" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Раздел в разработке</h3>
                  <p className="text-muted-foreground">Здесь будут графики и детальная аналитика</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
