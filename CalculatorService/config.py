import configparser

class ConfigReader:
    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read('./config.ini')
        
    def get_value(self, section, option):
        try:
            value = self.config.get(section, option)
            return value
        except (configparser.NoSectionError, configparser.NoOptionError):
            return None
    
    def get_config_postgres(self):
        host = self.config.get("POSTGRES","host")
        port = self.config.get("POSTGRES","port")
        user = self.config.get("POSTGRES","user")
        password = self.config.get("POSTGRES","password")
        database = self.config.get("POSTGRES","database")
        return host, port, user, password, database

    def get_time_sleep(self):
        return int(self.get_value('IT_FLM', 'time-sleep'))
    
    