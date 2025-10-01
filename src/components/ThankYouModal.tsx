import { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ThankYouModalProps {
  open: boolean;
  onClose: () => void;
}

export const ThankYouModal = ({ open, onClose }: ThankYouModalProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex flex-col items-center text-center space-y-6 py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-primary/10 p-6 rounded-full">
              <Icon name="CheckCircle2" size={64} className="text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Спасибо за заявку!
            </h2>
            <p className="text-muted-foreground text-lg">
              Мы получили вашу заявку
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 w-full space-y-3">
            <div className="flex items-start gap-3">
              <Icon name="Phone" size={20} className="text-primary mt-0.5" />
              <div className="text-left">
                <p className="font-medium">Свяжемся с вами в течение 15 минут</p>
                <p className="text-sm text-muted-foreground">Наш специалист ответит на все вопросы</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Icon name="Star" size={20} className="text-primary mt-0.5" />
              <div className="text-left">
                <p className="font-medium">Подберём лучшие варианты</p>
                <p className="text-sm text-muted-foreground">Исходя из ваших пожеланий и бюджета</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={onClose} 
            size="lg" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            Отлично
          </Button>

          <p className="text-xs text-muted-foreground">
            Окно закроется автоматически через 5 секунд
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
