import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

// import { UserState } from '../store/reducers/user-reducer';
import { PreferenceState } from '../store/reducers/preferences-reducer';
 
import { Character } from '../models/character-model';
import { CharacterStat } from '../models/stat-model';

// Likely Need more unique names?
const STORAGE = {
    // USERKEY: 'UserState',
    CHARACTERSKEY: 'CharMetaState',
    STATSKEY: 'StatMetaState',
    PREFSKEY: 'PrefState'
};

@Injectable()
export class StorageService {

    constructor(private storage: Storage) { }

    getDriver() {
        return this.storage.driver;
    }

    // setUserState(user: UserState) {
    //     return this.setItem(STORAGE.USERKEY, user);
    // }

    // getUserState() {
    //     return this.getItem(STORAGE.USERKEY);
    // }

    // remUserState() {
    //     return this.removeItem(STORAGE.USERKEY);
    // }

    setPrefState(pref: PreferenceState) {
        return this.setItem(STORAGE.PREFSKEY, pref);
    }

    getPrefState() {
        return this.getItem(STORAGE.PREFSKEY);
    }

    remPrefState() {
        return this.removeItem(STORAGE.PREFSKEY);
    }

    setCharMetaState(ids: string[], selectedId: string) {
        return this.setItem(STORAGE.CHARACTERSKEY, {ids, selectedId});
    }

    getCharMetaState() {
        return this.getItem(STORAGE.CHARACTERSKEY);
    }

    remCharMetaState() {
        return this.removeItem(STORAGE.CHARACTERSKEY);
    }

    addChar(ids: string[], selected: string, char: Character) {
        this.setCharMetaState(ids, selected);
        this.setItem(char.id, char);
        return char;
    }

    setChar(char: Character) {
        this.setItem(char.id, char);
    }

    remChar(ids: string[], selected: string, charId: string) {
        this.setCharMetaState(ids, selected);
        this.removeItem(charId);
    }

    setChars(chars: Character[]) {
        chars.map((char) => {
            this.setItem(char.id, char);
        });
    }

    getChars() {
        return this.getCharMetaState().then((meta) => {
            if (meta === null) {
                return null;
            } else {
                let promises = meta.ids.map((id) => {
                    return this.getItem(id).then((char) => {
                        return char;
                    });
                });
                return Promise.all(promises).then((chars) => {
                    return {chars: chars, selected: meta.selectedId};
                });
            }
        });
    }

    remChars() {
        this.getCharMetaState().then((meta) => {
            if (meta) {
                meta.ids.map((id) => {
                    this.removeItem(id);
                });
            }
        });
        this.remCharMetaState();
    }

    setStatMetaState(charId: string, ids: string[], selectedId: string) {
        return this.setItem(STORAGE.STATSKEY + charId, {ids, selectedId});
    }

    getStatMetaState(charId: string) {
        return this.getItem(STORAGE.STATSKEY + charId);
    }

    remStatMetaState(charId: string) {
        return this.removeItem(STORAGE.STATSKEY + charId);
    }

    addStat(charId: string, ids: string[], selected: string, stat: CharacterStat) {
        this.setStatMetaState(charId, ids, selected);
        this.setItem(stat.id, stat);
        return stat;
    }

    setStat(stat: CharacterStat) {
        this.setItem(stat.id, stat);
    }

    remStat(charId: string, ids: string[], selected: string, statId: string) {
        this.setStatMetaState(charId, ids, selected);
        this.removeItem(statId);
    }

    setStats(stats: CharacterStat[]) {
        stats.map((stat) => {
            this.setItem(stat.id, stat);
        });
    }

    getStats(charId: string) {
        return this.getStatMetaState(charId).then((meta) => {
            if (meta === null) {
                return null;
            } else {
                let promises = meta.ids.map((id) => {
                    return this.getItem(id).then((stat) => {
                        return stat;
                    });
                });
                return Promise.all(promises).then((results) => {
                    return {stats: results, selected: meta.selectedId} ;
                });
            }
        })
    }

    remStats(charId: string) {
        this.getStatMetaState(charId).then((meta) => {
            if (meta) {
                meta.ids.map((id) => {
                    this.removeItem(id);
                });
            }
        });
        this.remStatMetaState(charId);
    }

    clearDB() {
        this.storage.clear();
    }

    private getItem(KEY: string) {
        return this.storage.get(KEY).then((value) => {
            return value;
        }).catch((error) => {
            return error;
        })
    }

    private setItem(KEY: string, data: any) {
        this.storage.set(KEY, data).then((value) => {
            // return value;
        }).catch((error) => {
            // return error;
        })
    }

    private removeItem(KEY: string) {
        this.storage.remove(KEY).then(() => {
        }).catch((error) => {
            // return error;
        });
    }
}